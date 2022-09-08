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
    public class MediaRootFromRefDbResolver : IValueResolver<MediaRoot, MediaRootModel, List<MediaFileModel>>
    {
        private IUnitOfWork _uow;
        private IMapper _mapper;
        private IMemoryCache _cache;

        public MediaRootFromRefDbResolver(IUnitOfWork uow, IMapper mapper, IMemoryCache memoryCache)
        {
            _uow = uow;
            _mapper = mapper;
            _cache = memoryCache;
        }

        public List<MediaFileModel> Resolve(MediaRoot source, MediaRootModel destination, List<MediaFileModel> destMember, ResolutionContext context)
        {
            var list = new List<MediaFileModel>();
            foreach (var entry in source.Files)
            {
                MediaFile file = _uow.MediaFileRepository.GetById(entry.Id.AsString);
                var key = $"{CacheKeys.MediaFile}_{entry.Id.AsString}";
                // Look for cache key.
                if (!_cache.TryGetValue(key, out file))
                {
                    // Key not in cache, so get data.
                    file = _uow.MediaFileRepository.GetById(entry.Id.AsString);

                    // Set cache options.
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(600));

                    // Save data in cache.
                    _cache.Set(key, file, cacheEntryOptions);
                }

                var view = new MediaFileModel()
                {
                    Id = file.Id,
                    Name = file.Name,
                    Path = file.Path,
                    Type = file.Type,
                    Size = file.Size,
                    TenantId = file.TenantId.DocumentId,
                    PatientId = file.PatientId,
                    PatientName = file.PatientName,
                    Speciality = file.Speciality,
                    ConditionId = file.ConditionId,
                    ActivityType = file.ActivityType,
                    ActivityId = file.ActivityId,
                    IsDeleted = file.IsDeleted,
                    DeletedOn = file.DeletedOn,
                    TicketNumber=file.TicketNumber,
                    Tags = _mapper.Map<DataPartitionModel>(file.Tags)
                };
                list.Add(view);
            }
            return list;
        }
    }

}

