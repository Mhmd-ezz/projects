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

    public class AppointmentContactFromRefDbResolver : IValueResolver<Appointment, AppointmentModel, ContactModel>
    {
        private IUnitOfWork _uow;
        private IMapper _mapper;
        private IMemoryCache _cache;

        public AppointmentContactFromRefDbResolver(IUnitOfWork uow, IMapper mapper, IMemoryCache memoryCache)
        {
            _uow = uow;
            _mapper = mapper;
            _cache = memoryCache;
        }

        public ContactModel Resolve(Appointment source, AppointmentModel destination, ContactModel destMember, ResolutionContext context)
        {
            if (source.Contact == null)
                return null;

            Contact contact;
            var key = $"{CacheKeys.Contact}_{source.Contact.Id.AsString}";
            // Look for cache key.
            if (!_cache.TryGetValue(key, out contact))
            {
                // Key not in cache, so get data.
                contact = _uow.ContactRepository.GetById(source.Contact.Id.AsString);

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(600));

                // Save data in cache.
                _cache.Set(key, contact, cacheEntryOptions);
            }
            //var view = new ContactModel();
            var mapped = _mapper.Map<ContactModel>(contact);

            return mapped;
            //return view;
        }
    }
}
