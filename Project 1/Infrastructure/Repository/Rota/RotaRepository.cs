using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Exceptions;
using Medcilia.Clinic.Infrastructure.Services;
using Medcilia.Clinic.Infrastructure.Services.Audit;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Rota
{
    public class RotaRepository : BaseRepository<Domain.Rota>, IRotaRepository
    {
        private IAuditLog auditLog;

        public RotaRepository(IUnitOfWork unitOfWork, IAuditLog auditLog) : base(unitOfWork)
        {
            this.auditLog = auditLog;
            CreateIndex();
        }

        public override Domain.Rota Add(Domain.Rota entity)
        {
            if (DuplicateExists(entity))
                throw new DuplicateEntryException("A duplicate rota already exists !");

            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            Guard.Against<MissingTenantException>(
                (entity.TenantId == null || string.IsNullOrEmpty(entity.TenantId.DocumentId)),
                "Failed to insert new rota, missing required TenantId");

            auditLog.Log(AuditTypes.RotaCreated, new { TenantId = entity.TenantId.DocumentId });

            return base.Add(entity);
        }

        public override Domain.Rota Update(Domain.Rota entity)
        {
            entity.Modified = DomainTime.Now();

            auditLog.Log(AuditTypes.RotaUpdated, new { TenantId = entity.TenantId.DocumentId });

            var builder = Builders<Domain.Rota>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter &= builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }
        public override void Delete(Domain.Rota entity)
        {
            auditLog.Log(AuditTypes.RotaDeleted, new { TenantId = entity.TenantId.DocumentId });

            base.Delete(entity);
        }

        public async Task<PagedData<Domain.Rota>> Search(string text, string tenantId, int page, int size)
        {
            var query = BuildRotaQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            query = query.Where(x => x.IsDeleted != true);

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

            return new PagedData<Domain.Rota>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<Domain.Rota> BuildRotaQuery()
        {
            var rota = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = rota.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Rota()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Name = itemA.Name,
                    Color = itemA.Color,
                    Location = itemA.Location,
                    Recurrence = itemA.Recurrence,
                    IsDeleted = itemA.IsDeleted
                });


            return innerJoinResult;
        }

        private void CreateIndex()
        {
            var indexOptions = new CreateIndexOptions() { Background = true, Unique = true };
            var keys = Builders<Domain.Rota>.IndexKeys
                                            .Ascending(_ => _.IsDeleted)
                                            .Ascending(_ => _.TenantId)
                                            .Ascending(_ => _.Name)
                                            ;

            var model = new CreateIndexModel<Domain.Rota>(keys, indexOptions);
            Collection.Indexes.CreateOne(model);


        }
        private bool DuplicateExists(Domain.Rota entity)
        {
            var builder = Builders<Domain.Rota>.Filter;
            var filter = builder.Empty;

            //filter = filter & builder.Eq(x => x.IsDeleted, false);

            filter = filter & builder.Ne(x => x.Id, entity.Id);
            filter = filter & builder.Eq(x => x.Name, entity.Name);
            filter = filter & builder.Eq(x => x.IsDeleted, false);
            filter = filter & builder.Eq(x => x.TenantId.DocumentId, entity.TenantId.DocumentId);

            return Collection.Find(filter).Any();
        }
    }
}
