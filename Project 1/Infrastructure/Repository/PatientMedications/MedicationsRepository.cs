using System.Collections.Generic;
using System.Threading.Tasks;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;
using Medcilia.Clinic.Common.Extensions;
using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Medcilia.Clinic.Infrastructure.Repository.PatientMedications
{
    public class MedicationsRepository : BaseRepository<Domain.PatientMedications>, IMedicationsRepository
    {
        public MedicationsRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }
        public override Domain.PatientMedications Add(Domain.PatientMedications entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }
        public override Domain.PatientMedications Update(Domain.PatientMedications entity)
        {
            entity.Modified = DomainTime.Now();

            var builder = Builders<Domain.PatientMedications>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter = filter & builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }
        public override Domain.PatientMedications GetById(string id)
        {
            var query = BuildMedicationsQuery();

            return query.Where(x => x.PatientId == id).SingleOrDefault();
        }

        public async Task<PagedData<Domain.PatientMedications>> Search(DateTime startTime, DateTime endTime, string sortBy, bool descending, string tenantId, int page, int size)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildMedicationsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            // @ Should not be deleted
            // query = query.Where(x => x.DeletedOn == null);

            if (startTime != null)
            {
                query = query.Where(a => a.StartTime >= startTime);
                query = query.Where(a => a.EndTime >= startTime);
            }

            if (endTime != null)
            {
                query = query.Where(a => a.StartTime <= endTime);
                query = query.Where(a => a.EndTime <= endTime);
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = query.OrderBy(sortBy.ToTitleCase(), descending);
            }


            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                //.OrderByDescending(p=>p.LastSeen)
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.PatientMedications>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }
        public async Task<PagedData<Domain.PatientMedications>> SearchPatientMedications(string patientId, string tenantId)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildMedicationsQuery();

         

            // @ Should not be deleted
           // query = query.Where(x => x.DeletedOn == null);


            if (patientId != null)
            {
                query = query.Where(a => a.PatientId == patientId);
                
            }
            var totalTask = query.Count();
            var itemsTask = query               
                .ToList();

            return new PagedData<Domain.PatientMedications>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }
        public async Task<PagedData<Domain.PatientMedications>> SearchPatientMedicationsByCondition(string patientId,string conditionId, string tenantId)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildMedicationsQuery();



            // @ Should not be deleted
            // query = query.Where(x => x.DeletedOn == null);


            if (patientId != null)
            {
                query = query.Where(a => a.PatientId == patientId);

            }

            if (conditionId != null)
            {
                query = query.Where(a => a.ConditionId == conditionId && a.FollowupId == null
                ) ;

            }
            var totalTask = query.Count();
            var itemsTask = query
                .ToList();

            return new PagedData<Domain.PatientMedications>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }
        public async Task<PagedData<Domain.PatientMedications>> SearchPatientMedicationsByFollowup(string patientId,string followupId, string tenantId)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildMedicationsQuery();



            // @ Should not be deleted
            // query = query.Where(x => x.DeletedOn == null);


            if (patientId != null)
            {
                query = query.Where(a => a.PatientId == patientId);

            }
            if (followupId != null)
            {
                query = query.Where(a => a.FollowupId == followupId);

            }
            var totalTask = query.Count();
            var itemsTask = query
                .ToList();

            return new PagedData<Domain.PatientMedications>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        public Domain.PatientMedications updateMedications(string patientId, string medicationId)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildMedicationsQuery();



            // @ Should not be deleted
            // query = query.Where(x => x.DeletedOn == null);


            if (patientId != null)
            {
                query = query.Where(a => a.PatientId == patientId);

            }

            if (medicationId != null)
            {
                query = query.Where(a => a.MedicationId == medicationId);

            }
            var totalTask = query.Count();
            var itemsTask = query.FirstOrDefault();


            return itemsTask;
        }




        private IQueryable<Domain.PatientMedications> BuildMedicationsQuery()
        {
            var Medications = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = Medications.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.PatientMedications()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    MedicationId = itemA.MedicationId,
                    PatientId = itemA.PatientId,
                    ConditionId = itemA.ConditionId,
                    FollowupId = itemA.FollowupId,
                    Drug = itemA.Drug,
                    StartTime = itemA.StartTime,
                    EndTime = itemA.EndTime,
                    History = itemA.History,
                    IsActive = itemA.IsActive,
                    Reason = itemA.Reason,
                   
                });


            return innerJoinResult;
        }

    }
}
