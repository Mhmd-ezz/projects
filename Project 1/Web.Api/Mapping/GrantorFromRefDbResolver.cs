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
    public class GrantorFromRefDbResolver : IValueResolver<Patient, PatientModel, GrantorModel[]>
    {
        private IUnitOfWork _uow;
        private IMemoryCache _cache;
        public GrantorFromRefDbResolver(IUnitOfWork uow, IMemoryCache memoryCache)
        {
            _uow = uow;
            _cache = memoryCache;

        }
        public GrantorModel[] Resolve(Patient source, PatientModel destination, GrantorModel[] destMember, ResolutionContext context)
        {
            var list = new List<GrantorModel>();
            foreach (var entry in source.Grantors)
            {
                Grantor grantor;

                var key = $"{CacheKeys.Grantor}_{entry.Id.AsString}";
                // Look for cache key.
                if (!_cache.TryGetValue(key, out grantor))
                {
                    // Key not in cache, so get data.
                    grantor = _uow.GrantorRepository.GetById(entry.Id.AsString);

                    // Set cache options.
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(600));

                    // Save data in cache.
                    _cache.Set(key, grantor, cacheEntryOptions);
                }

                var view = new GrantorModel()
                {
                    
                    Id = grantor.Id,
                    Name = grantor.Name
                };
                list.Add(view);
            }
            return list.ToArray();
        }
    }
}

