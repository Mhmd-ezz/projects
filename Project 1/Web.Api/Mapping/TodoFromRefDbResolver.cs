using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.Helpers;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Mapping
{
    public class TodoFromRefDbResolver : IValueResolver<Patient, PatientModel, TodoModel[]>
    {
        private IUnitOfWork _uow;
        private IMemoryCache _cache;
        public TodoFromRefDbResolver(IUnitOfWork uow, IMemoryCache memoryCache)
        {
            _uow = uow;
            _cache = memoryCache;

        }
        public TodoModel[] Resolve(Patient source, PatientModel destination, TodoModel[] destMember, ResolutionContext context)
        {
            var list = new List<TodoModel>();
            foreach (var entry in source.Todos)
            {
                Todo todo;

                var key = $"{CacheKeys.Todo}_{entry.Id.AsString}";
                // Look for cache key.
                if (!_cache.TryGetValue(key, out todo))
                {
                    // Key not in cache, so get data.
                    todo = _uow.TodoRepository.GetById(entry.Id.AsString);

                    // Set cache options.
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(600));

                    // Save data in cache.
                    _cache.Set(key, todo, cacheEntryOptions);
                }

                var view = new TodoModel()
                {

                    Id = todo.Id,
                    Title = todo.Title,
                    StartDate = todo.StartDate,
                    DueDate = todo.DueDate,
                    Notes = todo.Notes,
                    IsCompleted = todo.IsCompleted,
                    IsStarred = todo.IsStarred,
                    IsImportant = todo.IsImportant,
                    PatientId = todo.PatientId
                };
                list.Add(view);
            }
            return list.ToArray();
        }
    }
}
