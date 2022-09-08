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
    public class RotaLocationFromRefDbResolver : IValueResolver<Rota, RotaModel, LocationViewModel>
    {
        private IUnitOfWork _uow;
        private IMemoryCache _cache;

        public RotaLocationFromRefDbResolver(IUnitOfWork uow, IMemoryCache memoryCache)
        {
            _uow = uow;
            _cache = memoryCache;
        }

        public LocationViewModel Resolve(Rota source, RotaModel destination, LocationViewModel destMember, ResolutionContext context)
        {
            if (source.Location == null) return null;

            Location location;
            var key = $"{CacheKeys.Location}_{source.Location.Id.AsString}";
            // Look for cache key.
            if (!_cache.TryGetValue(key, out location))
            {
                // Key not in cache, so get data.
                location = _uow.LocationRepository.GetById(source.Location.Id.AsString);

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(600));

                // Save data in cache.
                _cache.Set(key, location, cacheEntryOptions);
            }
            var view = new LocationViewModel()
            {
                Id = location.Id,
                Name = location.Name
            };

            return view;
        }
    }
}
