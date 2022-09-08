using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Repository
{
    public class BaseRepository<T, TKey> : IBaseRepository<T, TKey>
        where T : IEntity<TKey>
    {
        public IUnitOfWork UnitOfWork { get; }

        public BaseRepository(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            Collection = unitOfWork.Database.GetCollection<T>(GetCollectionName());
        }

        public IMongoCollection<T> Collection { get; }

        public virtual IQueryable<T> AsQueryable()
        {
            return Collection.AsQueryable();
        }

        public virtual IEnumerable<T> Add(IEnumerable<T> entities)
        {
            Collection.InsertMany(entities);
            return entities;
        }

        public virtual T Add(T entity)
        {
            Collection.InsertOne(entity);
            return entity;
        }

        public async Task AddAsync(T entity)
        {
            await Collection.InsertOneAsync(entity);
        }
        public virtual long Count()
        {
            //var filter = Builders<T>.Filter.Empty;
            return Collection.CountDocuments(x => true);
        }

        public virtual void Delete(Expression<Func<T, bool>> predicate)
        {
            Collection.DeleteMany<T>(predicate);
        }

        public virtual void Delete(T entity)
        {
            var filter = Builders<T>.Filter.Eq(s => s.Id, entity.Id);
            Collection.DeleteOne(filter);
        }

        public virtual void Delete(TKey id)
        {
            var filter = Builders<T>.Filter.Eq(s => s.Id, id);
            Collection.DeleteOne(filter);
        }

        public virtual void DeleteAll()
        {
            Collection.DeleteMany(x => true);
        }

        public virtual void Drop()
        {
            Collection.Database.DropCollection(Collection.CollectionNamespace.CollectionName);
        }

        public virtual bool Exists()
        {
            return Collection.AsQueryable().Any();
        }

        public virtual bool Exists(Expression<Func<T, bool>> predicate)
        {
            return Collection.AsQueryable().Any(predicate);
        }

        public virtual T GetById(TKey id)
        {
            var filter = Builders<T>.Filter.Eq(s => s.Id, id);
            return Collection.Find(filter).SingleOrDefault();
        }

        public virtual async Task<T> GetByIdAsync(TKey id)
        {
            var filter = Builders<T>.Filter.Eq(s => s.Id, id);
            return await Collection.Find(filter).SingleOrDefaultAsync();
        }
        public virtual IEnumerable<T> GetByIds(IEnumerable<TKey> ids)
        {
            var filter = Builders<T>.Filter.In(s => s.Id, ids);
            return Collection.Find(filter).ToList();
        }

        public virtual void Update(IEnumerable<T> entities)
        {
            Parallel.ForEach(entities, entity =>
            {
                Update(entity);
            });
        }

        public virtual T Update(T entity)
        {
            var filter = Builders<T>.Filter.Eq(s => s.Id, entity.Id);
            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        private static string GetCollectionName()
        {
            var collectionName = typeof(T).GetTypeInfo().BaseType == typeof(object)
                ? GetCollectioNameFromInterface()
                : GetCollectionNameFromType(typeof(T));

            if (string.IsNullOrEmpty(collectionName))
                throw new ArgumentException("Collection name cannot be empty for this entity");
            return collectionName;
        }

        private static string GetCollectioNameFromInterface()
        {
            // Check to see if the object (inherited from Entity) has a CollectionName attribute
            var att = typeof(T).GetTypeInfo().GetCustomAttribute<CollectionName>();
            var collectionname = att != null ? att.Name : typeof(T).Name;

            return collectionname;
        }

        private static string GetCollectionNameFromType(Type entitytype)
        {
            string collectionname;

            // Check to see if the object (inherited from Entity) has a CollectionName attribute
            var att = entitytype.GetTypeInfo().GetCustomAttribute<CollectionName>();
            if (att != null)
            {
                // It does! Return the value specified by the CollectionName attribute
                collectionname = att.Name;
            }
            else
            {
                if (typeof(Entity).GetTypeInfo().IsAssignableFrom(entitytype))
                    while (entitytype.GetTypeInfo().BaseType != typeof(Entity))
                        entitytype = entitytype.GetTypeInfo().BaseType;
                collectionname = entitytype.Name;
            }

            return collectionname;
        }

        #region IQueryable<T>

        public virtual IEnumerator<T> GetEnumerator()
        {
            return Collection.AsQueryable().GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return Collection.AsQueryable().GetEnumerator();
        }

        public virtual Type ElementType => Collection.AsQueryable().ElementType;

        public virtual Expression Expression => Collection.AsQueryable().Expression;

        public virtual IQueryProvider Provider => Collection.AsQueryable().Provider;

        #endregion

        protected ObjectId Parse(string s)
        {
            if (s == null)
            {
                throw new ArgumentNullException("s");
            }

            ObjectId objectId;
            if (TryParse(s, out objectId))
            {
                return objectId;
            }
            else
            {
                var message = string.Format("'{0}' is not a valid 24 digit hex string.", s);
                throw new FormatException(message);
            }
        }

        protected bool TryParse(string s, out ObjectId objectId)
        {
            // don't throw ArgumentNullException if s is null
            if (s != null && s.Length == 24)
            {
                byte[] bytes;
                if (BsonUtils.TryParseHexString(s, out bytes))
                {
                    objectId = new ObjectId(bytes);
                    return true;
                }
            }

            objectId = default(ObjectId);
            return false;
        }
    }

    public class BaseRepository<T> : BaseRepository<T, string>, IBaseRepository<T>
        where T : IEntity<string>
    {
        public BaseRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
