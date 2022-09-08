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

    public class DrugFromRefDbResolver : IValueResolver<Medication, MedicationModel, DrugViewModel>
    {
        private IUnitOfWork _uow;
        private IMemoryCache _cache;

        public DrugFromRefDbResolver(IUnitOfWork uow, IMemoryCache memoryCache)
        {
            _uow = uow;
            _cache = memoryCache;
        }

        public DrugViewModel Resolve(Medication source, MedicationModel destination, DrugViewModel destMember, ResolutionContext context)
        {
            Drug drug;

            var key = $"{CacheKeys.Drug}_{source.Drug.Id.AsString}";
            // Look for cache key.
            if (!_cache.TryGetValue(key, out drug))
            {
                // Key not in cache, so get data.
                drug = _uow.DrugRepository.GetById(source.Drug.Id.AsString);

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(600));

                // Save data in cache.
                _cache.Set(key, drug, cacheEntryOptions);
            }

            if (drug == null)
                return null;

            var view = new DrugViewModel()
            {
                Id = drug.Id,
                Name = drug.Name,
                //Form = drug.Form,
                //Dosage = drug.Dosage,
                //Presentation = drug.Presentation,
                //Route = drug.Route,
                //AtcCode = drug.AtcCode
            };
            
            return view;
        }
    }
}
