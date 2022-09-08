using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.Helpers;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;

namespace Medcilia.Clinic.WebApi.Mapping
{

    public class CardiologySurgicalHistoryLookupFromRefDbResolver : IValueResolver<CardiologySurgicalHistory, CardiologySurgicalHistoryModel, LookupViewModel[]>
    {
        private IUnitOfWork _uow;
        private IMemoryCache _cache;

        public CardiologySurgicalHistoryLookupFromRefDbResolver(IUnitOfWork uow, IMemoryCache memoryCache)
        {
            _uow = uow;
            _cache = memoryCache;
        }

        public LookupViewModel[] Resolve(CardiologySurgicalHistory source, CardiologySurgicalHistoryModel destination, LookupViewModel[] destMember, ResolutionContext context)
        {
            var list = new List<LookupViewModel>();
            foreach (var entry in source.What)
            {
                LookUp lookup;
                var key = $"{CacheKeys.Lookup}_{entry.Id.AsString}";
                // Look for cache key.
                if (!_cache.TryGetValue(key, out lookup))
                {
                    // Key not in cache, so get data.
                    lookup = _uow.LookupRepository.GetById(entry.Id.AsString);

                    // Keep in cache for this time, reset time if accessed.
                    var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));

                    // Save data in cache.
                    _cache.Set(key, lookup, cacheEntryOptions);
                }

                var view = new LookupViewModel()
                {
                    Value = lookup.Value,
                    Group = lookup.GroupKey,
                    Text = lookup.Text
                };
                list.Add(view);
            }
            return list.ToArray();
        }
    }
}
