using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMongoQueryable = MongoDB.Driver.Linq.IMongoQueryable;

namespace Medcilia.Clinic.Infrastructure.Repository.MediaFile
{
    public class MediaFileRepository : BaseRepository<Domain.MediaFile>, IMediaFileRepository
    {
        public MediaFileRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }


        public override Domain.MediaFile Add(Domain.MediaFile entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.MediaFile Update(Domain.MediaFile entity)
        {
            entity.Modified = DomainTime.Now();

            var builder = Builders<Domain.MediaFile>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter = filter & builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }


        public List<Domain.MediaFile> GetAll()
        {
            var builder = Builders<Domain.MediaFile>.Filter;
            var filter = builder.Eq(s => s.IsDeleted, false);

            return Collection.Find(filter).ToList();
        }

        public List<Domain.MediaFile> GetAllDeleted()
        {
            var builder = Builders<Domain.MediaFile>.Filter;
            var filter = builder.Eq(s => s.IsDeleted, true);

            return Collection.Find(filter).ToList();
        }

        public async Task<PagedData<PatientMediaFiles>> SearchPatientsMediaFiles(string text, string patientId, string tenantId, int page, int size)
        {
            var query = BuildContactMediaFilesQuery(tenantId);

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(patientId))
            {
                query = query.Where(x => x.Id == patientId);
            }

            // we have list of files grouped by patients 
            //var files2 = query
            //        .OrderBy(x => x.Modified)
            //        .Where(x => x.PatientId != "" && x.PatientId != null)
            //        .ToLookup(p => p.PatientId, r => r)
            //        .Skip(start)
            //        .Take(size)
            //        .ToList();

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<PatientMediaFiles>
            {
                Total = totalTask,
                Items = itemsTask
            };

        }

        public async Task<PagedData<Domain.MediaFile>> Search(string text, string tenantId, int page, int size)
        {
            var query = BuildQuery();

            query = query.Where(x => x.IsDeleted == false);

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.ToLower().Contains(text.ToLower()));
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.MediaFile>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        public async Task<PagedData<Domain.MediaFile>> SearchByPatientId(string text, string tenantId, string patientId, int page, int size)
        {

            var query = BuildQuery();

            query = query.Where(x => x.IsDeleted == false);


            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.ToLower().Contains(text.ToLower()));
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.PatientId == patientId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.MediaFile>
            {
                Total = totalTask,
                Items = itemsTask
            };

        }

        public async Task<PagedData<Domain.MediaFile>> GetMediaPoolByPatientId(string text, string tenantId, string patientId, int page, int size)
        {

            var query = BuildQuery();

            query = query.Where(x => x.IsDeleted == false);

            // @ Take only patient media pool files and ignore media files related to activites 
            query = query.Where(x => string.IsNullOrEmpty(x.ConditionId) && string.IsNullOrEmpty(x.Speciality));

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

          
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.PatientId == patientId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.MediaFile>
            {
                Total = totalTask,
                Items = itemsTask
            };

        }


        public async Task<PagedData<Domain.MediaFile>> SearchByActivity(string text, string tenantId, string patientId, string speciality, string conditionId, string activitType, string activityId, int page, int size)
        {

            var query = BuildQuery();

          query = query.Where(x => x.IsDeleted == false);

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.ToLower().Contains(text.ToLower()));
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }
            if (!string.IsNullOrEmpty(patientId))
            {
                query = query.Where(x => x.PatientId == patientId);
            }

            if (!string.IsNullOrEmpty(speciality))
            {
                query = query.Where(x => x.Speciality.ToLower() == speciality.ToLower());
            }

            if (!string.IsNullOrEmpty(conditionId))
            {
                query = query.Where(x => x.ConditionId == conditionId);
            }

            if (!string.IsNullOrEmpty(activitType))
            {
                query = query.Where(x => x.ActivityType.ToLower() == activitType.ToLower());
            }

            if (!string.IsNullOrEmpty(activityId))
            {
                query = query.Where(x => x.ActivityId == activityId);
            }
            else
            {
                query = query.Where(x => x.ActivityId == null || x.ActivityId == "");
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.MediaFile>
            {
                Total = totalTask,
                Items = itemsTask
            };

        }


        private IQueryable<Domain.MediaFile> BuildQuery()
        {
            var mediaFiles = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = mediaFiles.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.MediaFile()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Name = itemA.Name,
                    Speciality = itemA.Speciality,
                    PatientId = itemA.PatientId,
                    PatientName = itemA.PatientName,
                    ActivityId = itemA.ActivityId,
                    ActivityType = itemA.ActivityType,
                    ConditionId = itemA.ConditionId,
                    Path = itemA.Path,
                    Size = itemA.Size,
                    Type = itemA.Type,
                    DeletedOn = itemA.DeletedOn,
                    IsDeleted = itemA.IsDeleted,
                    Tags = itemA.Tags,
                    SystemTaggingKey = itemA.SystemTaggingKey,
                    TicketNumber = itemA.TicketNumber
                }) ;


            return innerJoinResult;
        }

        public async Task<PagedData<Domain.MediaFile>> SearchTicketsMediaFiles(string text, string ticketNumber, int page, int size)
        {
            var query = BuildQuery();

            query = query.Where(x => x.IsDeleted == false);

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;
            if (!string.IsNullOrEmpty(ticketNumber))
            {

                query = query.Where(x => x.TicketNumber == ticketNumber);
            }
            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.ToLower().Contains(text.ToLower()));
            }
            //if (!string.IsNullOrEmpty(tenantId))
            //{
             //   query = query.Where(x => x.TenantId.DocumentId == tenantId);
           // }
            
            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.MediaFile>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<PatientMediaFiles> BuildContactMediaFilesQuery(string tenantId)
        {            
            var mediaFiles = Collection.AsQueryable();
            var patients = this.UnitOfWork.Database.GetCollection<Domain.Contact>(this.UnitOfWork.ContactCollectionName).AsQueryable();

            var innerJoinResult = patients
                .Where(x => x.TenantId.DocumentId == tenantId)
                .GroupJoin(
                    mediaFiles,
                    itemA => itemA.Id,
                    itemB => itemB.PatientId,
                    (patient, files) => new PatientMediaFiles
                    {
                        Id = patient.Id,
                        PatientName = patient.Name,
                        Pool = files.Where(x => string.IsNullOrEmpty(x.Speciality)),
                        Files = files.Where(x => !string.IsNullOrEmpty(x.Speciality)),
                        Pdfs = files.Where(x => x.Type == "application/pdf"),
                        Images = files.Where(x => x.Type.IndexOf("image") > -1),
                        //PdfCount = (files == null ? 0 : files.Where(file => file.Type == "application/pdf").Count()),
                        //ImagesCount = (files == null ? 0 : files.Where(x => x.Type.IndexOf("image") > -1).Count())
                    })
                .OrderBy(c => c.PatientName);

            return innerJoinResult;
        }

        private IQueryable<PatientMediaFiles> BuildContactMediaFilesQuery_old(string tenantId)
        {
            var mediaFiles = Collection.AsQueryable();
            var patients = this.UnitOfWork.Database.GetCollection<Domain.Contact>(this.UnitOfWork.ContactCollectionName).AsQueryable();

            mediaFiles.Where(f => f.IsDeleted == false);

            var query__ = from patient in patients
                          join media in mediaFiles
                          on patient.Id equals media.PatientId
                          into files
                          where patient.TenantId.DocumentId == tenantId

                          select new PatientMediaFiles()
                          {
                              Id = patient.Id,
                              PatientName = patient.Name,
                              Pool = (files == null ? Enumerable.Empty<Domain.MediaFile>() : files.Where(x => string.IsNullOrEmpty(x.Speciality))),
                              Files = (files == null ? Enumerable.Empty<Domain.MediaFile>() : files.Where(x => !string.IsNullOrEmpty(x.Speciality))),
                              Pdfs = (files == null ? Enumerable.Empty<Domain.MediaFile>() : files.Where(x => x.Type == "application/pdf")),
                              Images = (files == null ? Enumerable.Empty<Domain.MediaFile>() : files.Where(x => x.Type.IndexOf("image") > -1))
                          };

            query__.OrderBy(c => c.PatientName);

            return query__;

        }

        public async Task<PagedData<Domain.MediaFile>> GetTenantPoolMediaFiles(string text, string tenantId, int page, int size)
        {
            var query = BuildQuery();

            query = query.Where(x => x.IsDeleted == false);

            // @ match files not related to any patient
            query = query.Where(x => string.IsNullOrEmpty(x.PatientId));

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.Contains(text));
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.MediaFile>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }


    }
}
