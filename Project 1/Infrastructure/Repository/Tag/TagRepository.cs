using Audit.Core;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure.Services.Audit;
using Medcilia.Clinic.Infrastructure.Exceptions;
using Medcilia.Clinic.Common;

namespace Medcilia.Clinic.Infrastructure.Repository.Tag
{
    public class TagRepository : BaseRepository<Domain.Tag>, ITagRepository
    {
        private IAuditLog auditLog;
        public TagRepository(IUnitOfWork unitOfWork, IAuditLog auditLog) : base(unitOfWork)
        {
            this.auditLog = auditLog;
            CreateIndex();
        }
        public override Domain.Tag Add(Domain.Tag entity)
        {
            if (DuplicateExists(entity))
                throw new DuplicateEntryException("A duplicate tag already exists !");

            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            Guard.Against<MissingTenantException>(
                (entity.TenantId == null || string.IsNullOrEmpty(entity.TenantId.DocumentId)),
                "Failed to insert new tag, missing required TenantId");

            auditLog.Log(AuditTypes.TagCreated, new { TenantId = entity.TenantId.DocumentId });

            return base.Add(entity);
        }
        public override Domain.Tag Update(Domain.Tag entity)
        {
            entity.Modified = DomainTime.Now();

            auditLog.Log(AuditTypes.TagUpdated, new { TenantId = entity.TenantId.DocumentId });

            var builder = Builders<Domain.Tag>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter &= builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }
        public bool CanDelete(string id)
        {
            var patientCollection = UnitOfWork.Database.GetCollection<Domain.Contact>("Contacts");
            var builder = Builders<Domain.Contact>.Filter;

            var filter = builder.Or(
                // @ Patients
                builder.AnyEq("PatientInfo.Tags.Id", id)
                // @ TODO : Check CODES               
                );

            var result = patientCollection.Find(filter).ToList();
            return result.Count > 0 ? false : true;
        }
        public override void Delete(Domain.Tag entity)
        {
            auditLog.Log(AuditTypes.TagDeleted, new { TenantId = entity.TenantId.DocumentId });

            base.Delete(entity);
        }
        public async Task<PagedData<Domain.Tag>> Search(string text, string tenantId, int page, int size)
        {
            var query = BuildTagsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.ToLower().Contains(text.ToLower()) ||
                x.Group.ToLower().Contains(text.ToLower())
                );
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

            return new PagedData<Domain.Tag>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }
        private IQueryable<Domain.Tag> BuildTagsQuery()
        {
            var tags = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = tags.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Tag()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Name = itemA.Name,
                    Group = itemA.Group,
                });


            return innerJoinResult;
        }
        private void CreateIndex()
        {
            var indexOptions = new CreateIndexOptions() { Background = true, Unique = true };
            var keys = Builders<Domain.Tag>.IndexKeys
                                            .Ascending(_ => _.TenantId)
                                            .Ascending(_ => _.Name)
                                            ;
            var model = new CreateIndexModel<Domain.Tag>(keys, indexOptions);
            Collection.Indexes.CreateOne(model);
        }
        private bool DuplicateExists(Domain.Tag entity)
        {
            var builder = Builders<Domain.Tag>.Filter;
            var filter = builder.Empty;

            //filter = filter & builder.Eq(x => x.IsDeleted, false);

            filter = filter & builder.Ne(x => x.Id, entity.Id);
            filter = filter & builder.Eq(x => x.Name, entity.Name);
            filter = filter & builder.Eq(x => x.TenantId.DocumentId, entity.TenantId.DocumentId);

            return Collection.Find(filter).Any();
        }

    }
}
