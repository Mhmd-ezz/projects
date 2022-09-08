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
    public class TagFromRefDbResolver : IValueResolver<Patient, PatientModel, TagModel[]>
    {
        private IUnitOfWork _uow;
        private IMemoryCache _cache;
        public TagFromRefDbResolver(IUnitOfWork uow, IMemoryCache memoryCache)
        {
            _uow = uow;
            _cache = memoryCache;

        }
        public TagModel[] Resolve(Patient source, PatientModel destination, TagModel[] destMember, ResolutionContext context)
        {
            var list = new List<TagModel>();
            foreach (var entry in source.Tags)
            {
                Tag tag;

                var key = $"{CacheKeys.Tag}_{entry.Id.AsString}";
                // Look for cache key.
                if (!_cache.TryGetValue(key, out tag))
                {
                    // Key not in cache, so get data.
                    tag = _uow.TagRepository.GetById(entry.Id.AsString);

                    // Set cache options.
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(600));

                    // Save data in cache.
                    _cache.Set(key, tag, cacheEntryOptions);
                }

                var view = new TagModel()
                {

                    Id = tag.Id,
                    Name = tag.Name,
                    Group=tag.Group
                };
                list.Add(view);
            }
            return list.ToArray();
        }
    }
}
