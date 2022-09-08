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
    public class PatientMedicationsDrugFromRefDbResolver : IValueResolver<PatientMedications, PatientMedicationsModel, DrugViewModel>
    {
        private IUnitOfWork _uow;
        private IMapper _mapper;
        private IMemoryCache _cache;

        public PatientMedicationsDrugFromRefDbResolver(IUnitOfWork uow, IMapper mapper, IMemoryCache memoryCache)
        {
            _uow = uow;
            _mapper = mapper;
            _cache = memoryCache;
        }
        public DrugViewModel Resolve(PatientMedications source, PatientMedicationsModel destination, DrugViewModel destMember, ResolutionContext context)
        {
            if (source.Drug == null)
                return null;

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

             var mapped = _mapper.Map<DrugViewModel>(drug);
            return mapped;
            //var view = new DrugViewModel()
            //{
            //    Id = drug.Id,
            //    Name = drug.Name,
            //    //Form = drug.Form,
            //    Dosage = drug.Dosage,
            //    //Presentation = drug.Presentation,
            //    //Route = drug.Route,
            //    //AtcCode = drug.AtcCode
            //};

            //return view;

        }
    }
}
