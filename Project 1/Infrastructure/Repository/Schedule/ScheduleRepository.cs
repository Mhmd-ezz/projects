using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Exceptions;
using Medcilia.Clinic.Infrastructure.Services.Audit;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Schedule
{
    public class ScheduleRepository : BaseRepository<Domain.Schedule>, IScheduleRepository
    {
        private IAuditLog auditLog;

        public ScheduleRepository(IUnitOfWork unitOfWork, IAuditLog auditLog) : base(unitOfWork)
        {
            this.auditLog = auditLog;
            CreateIndex();
        }

        public override Domain.Schedule Add(Domain.Schedule entity)
        {
            if (DuplicateExists(entity))
                throw new DuplicateEntryException("A duplicate schdeule already exists !");

            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            Guard.Against<MissingTenantException>(
                (entity.TenantId == null || string.IsNullOrEmpty(entity.TenantId.DocumentId)),
                "Failed to insert new schedule, missing required TenantId");

            auditLog.Log(AuditTypes.ScheduleCreated, new { TenantId = entity.TenantId.DocumentId });

            return base.Add(entity);
        }

        public override Domain.Schedule Update(Domain.Schedule entity)
        {
            entity.Modified = DomainTime.Now();

            auditLog.Log(AuditTypes.ScheduleUpdated, new { TenantId = entity.TenantId.DocumentId });

            var builder = Builders<Domain.Schedule>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter &= builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public override void Delete(Domain.Schedule entity)
        {
            auditLog.Log(AuditTypes.ScheduleDeleted, new { TenantId = entity.TenantId.DocumentId });

            base.Delete(entity);
        }

        public Domain.Schedule get(string tenantId)
        {
            var query = BuildScheduleQuery();

            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            return query.FirstOrDefault();
        }

        private IQueryable<Domain.Schedule> BuildScheduleQuery()
        {
            var schedule = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = schedule.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Schedule()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    StartHour = itemA.StartHour,
                    EndHour = itemA.EndHour,
                    DisplayRota = itemA.DisplayRota
                });


            return innerJoinResult;
        }

        private void CreateIndex()
        {
            var indexOptions = new CreateIndexOptions() { Background = true, Unique = true };
            var keys = Builders<Domain.Schedule>.IndexKeys
                                            .Ascending(_ => _.TenantId)
                                            ;

            var model = new CreateIndexModel<Domain.Schedule>(keys, indexOptions);
            Collection.Indexes.CreateOne(model);


        }

        private bool DuplicateExists(Domain.Schedule entity)
        {
            var builder = Builders<Domain.Schedule>.Filter;
            var filter = builder.Empty;

            //filter = filter & builder.Eq(x => x.IsDeleted, false);

            filter = filter & builder.Ne(x => x.Id, entity.Id);
            filter = filter & builder.Eq(x => x.TenantId.DocumentId, entity.TenantId.DocumentId);

            return Collection.Find(filter).Any();
        }

    }
}
