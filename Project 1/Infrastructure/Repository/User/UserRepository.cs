using System.Linq;
using System.Threading.Tasks;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Repository.User
{
    public class UserRepository : BaseRepository<Domain.User>, IUserRepository
    {
        public UserRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        //private void EnsureCollectionCreated()
        //{
        //    //Sharded collection must be initialized this way
        //    var bson = new BsonDocument
        //    {
        //        { "shardCollection", mongoClientProvider.DatabaseName + "." + CollectionName },
        //        { "key", new BsonDocument(ShardKeyName, "hashed") }
        //    };

        //    var shellCommand = new BsonDocumentCommand<BsonDocument>(bson);

        //    //try
        //    //{
        //    this.Collection.Database.RunCommand(shellCommand);
        //    //}
        //    //catch (MongoCommandException ex)
        //    //{
        //    //    logger.LogError(ex, ex.Result.ToString());
        //    //}
        //}

        public override Domain.User Add(Domain.User entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.User Update(Domain.User entity)
        {
            entity.Modified = DomainTime.Now();

            var builder = Builders<Domain.User>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter = filter & builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public override Domain.User GetById(string id)
        {
            var query = BuildUsersQuery();

            return query.Where(x => x.Id == id).SingleOrDefault();
        }


        public async Task<PagedData<Domain.User>> Search(string text, string tenantId, int page, int size)
        {
            var query = BuildUsersQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            query = query.Where(x => x.IsDeleted == false);

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.FirstName.ToLower().Contains(text.ToLower()) || x.LastName.ToLower().Contains(text.ToLower()));
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

            return new PagedData<Domain.User>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        public Domain.User GetUserByTenantId(string tenantId, string userId)
        {
            var query = BuildUsersQuery();
            query = query.Where(x => x.TenantId.DocumentId == tenantId);

            return query
                .Where(x => x.Id == userId)
                .SingleOrDefault();
        }

        // @ get user by userId( the user id on sql security)
        public Domain.User GetUserByAltUserId(string tenantId, string userId)
        {
            var query = BuildUsersQuery();
            query = query.Where(x => x.TenantId.DocumentId == tenantId);

            return query
                .Where(x => x.UserId == userId)
                .SingleOrDefault();
        }

        #region Private Methods
        private IQueryable<Domain.User> BuildUsersQuery()
        {
            var users = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = users.GroupJoin(
                    tenants,
                    itemA => itemA.TenantId.DocumentId,
                    itemB => itemB.Id,
                    (x, y) => new { User = x, Tenants = y })
                .SelectMany(
                    x => x.Tenants.DefaultIfEmpty(),
                    (itemA, itemB) => new Domain.User() // when they match make a new object
                    {
                        // where you only select the properties you want
                        Id = itemA.User.Id,
                        UserId =  itemA.User.UserId,
                        CreatedOn = itemA.User.CreatedOn,
                        Modified = itemA.User.Modified,
                        UserName = itemA.User.UserName,
                        FirstName = itemA.User.FirstName,
                        LastName = itemA.User.LastName,
                        Email = itemA.User.Email,
                        Phone = itemA.User.Phone,
                        IsEnabled = itemA.User.IsEnabled,
                        IsDeleted = itemA.User.IsDeleted,
                        Roles = itemA.User.Roles,
                        TenantId = itemA.User.TenantId,
                        Tenant = itemB,
                    });

            return innerJoinResult;
        }
        #endregion

    }
}
