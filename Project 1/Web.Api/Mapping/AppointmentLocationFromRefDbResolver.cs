using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.Helpers;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;

namespace Medcilia.Clinic.WebApi.Mapping
{

    public class AppointmentLocationFromRefDbResolver : IValueResolver<Appointment, AppointmentModel, LocationViewModel>
    {
        private IUnitOfWork _uow;
        private IMapper _mapper;
        private IMemoryCache _cache;

        public AppointmentLocationFromRefDbResolver(IUnitOfWork uow, IMapper mapper, IMemoryCache memoryCache)
        {
            _uow = uow;
            _mapper = mapper;
            _cache = memoryCache;
        }

        public LocationViewModel Resolve(Appointment source, AppointmentModel destination, LocationViewModel destMember, ResolutionContext context)
        {
            if (source.Location == null)
                return null;

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
            //var view = new ContactModel();
            var mapped = _mapper.Map<LocationViewModel>(location);

            return mapped;
            //return view;
        }
    }
}
