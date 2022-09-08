using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Exceptions;
using Medcilia.Clinic.Infrastructure.Services;
using Medcilia.Clinic.Infrastructure.Services.Audit;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Todo
{
    public class TodoRepository : BaseRepository<Domain.Todo>, ITodoRepository
    {
        private IAuditLog auditLog;

        public TodoRepository(IUnitOfWork unitOfWork, IAuditLog auditLog) : base(unitOfWork)
        {
            this.auditLog = auditLog;
            CreateIndex();
        }

        public override Domain.Todo Add(Domain.Todo entity)
        {
            if (DuplicateExists(entity))
                throw new DuplicateEntryException("A duplicate todo already exists !");

            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            Guard.Against<MissingTenantException>(
                (entity.TenantId == null || string.IsNullOrEmpty(entity.TenantId.DocumentId)),
                "Failed to insert new todo, missing required TenantId");

            auditLog.Log(AuditTypes.TodoCreated, new { TenantId = entity.TenantId.DocumentId });

            return base.Add(entity);
        }

        public override Domain.Todo Update(Domain.Todo entity)
        {
            entity.Modified = DomainTime.Now();

            auditLog.Log(AuditTypes.TodoUpdated, new { TenantId = entity.TenantId.DocumentId });

            var builder = Builders<Domain.Todo>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter &= builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public bool CanDelete(string id)
        {
            var patientCollection = UnitOfWork.Database.GetCollection<Domain.Todo>("Todos");
            var builder = Builders<Domain.Todo>.Filter;

            var filter = builder.Or(
                // @ Patients
                builder.AnyEq("PatientInfo.Grantors.Id", id)
                // @ TODO : Check CODES               
                );

            var result = patientCollection.Find(filter).ToList();
            return result.Count > 0 ? false : true;
        }


        public override void Delete(Domain.Todo entity)
        {
            auditLog.Log(AuditTypes.TodoDeleted, new { TenantId = entity.TenantId.DocumentId });

            base.Delete(entity);
        }

        public async Task<PagedData<Domain.Todo>> Search(string text, string tenantId, int page, int size, string patientId)
        {
            var query = BuildTodosQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Title.ToLower().Contains(text.ToLower()));
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }
            if (!string.IsNullOrEmpty(patientId))
            {
                query = query.Where(x => x.PatientId == patientId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.Todo>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<Domain.Todo> BuildTodosQuery()
        {
            var todos = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = todos.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Todo()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Title = itemA.Title,
                    Notes = itemA.Notes,
                    StartDate = itemA.StartDate,
                    DueDate = itemA.DueDate,
                    IsCompleted = itemA.IsCompleted,
                    IsStarred = itemA.IsStarred,
                    IsImportant = itemA.IsImportant,
                    PatientId = itemA.PatientId
                });


            return innerJoinResult;
        }
        private void CreateIndex()
        {
            var indexOptions = new CreateIndexOptions() { Background = true, Unique = true };
            var keys = Builders<Domain.Todo>.IndexKeys
                                            .Ascending(_ => _.TenantId)
                                            .Ascending(_ => _.Title)
                                            ;
            var model = new CreateIndexModel<Domain.Todo>(keys, indexOptions);
            Collection.Indexes.CreateOne(model);
        }
        private bool DuplicateExists(Domain.Todo entity)
        {
            var builder = Builders<Domain.Todo>.Filter;
            var filter = builder.Empty;

            //filter = filter & builder.Eq(x => x.IsDeleted, false);

            filter = filter & builder.Ne(x => x.Id, entity.Id);
            filter = filter & builder.Eq(x => x.Title, entity.Title);
            filter = filter & builder.Eq(x => x.TenantId.DocumentId, entity.TenantId.DocumentId);

            return Collection.Find(filter).Any();
        }
    }
}
