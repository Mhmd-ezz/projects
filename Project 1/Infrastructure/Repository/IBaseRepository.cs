using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Repository
{
    /// <summary>
    ///     IBaseRepository definition.
    /// </summary>
    /// <typeparam name="T">The type contained in the repository.</typeparam>
    /// <typeparam name="TKey">The type used for the entity's Id.</typeparam>
    public interface IBaseRepository<T, in TKey> : IQueryable<T>
        where T : IEntity<TKey>
    {
        /// <summary>
        ///     Gets the Mongo collection (to perform advanced operations).
        /// </summary>
        /// <remarks>
        ///     One can argue that exposing this property (and with that, access to it's Database property for instance
        ///     (which is a "parent")) is not the responsibility of this class. Use of this property is highly discouraged;
        ///     for most purposes you can use the MongoRepositoryManager&lt;T&gt;
        /// </remarks>
        /// <value>The Mongo collection (to perform advanced operations).</value>
        IMongoCollection<T> Collection { get; }

        IQueryable<T> AsQueryable();

        T GetById(TKey id);

        Task<T> GetByIdAsync(TKey id);

        IEnumerable<T> GetByIds(IEnumerable<TKey> ids);

        T Add(T entity);
        Task AddAsync(T entity);

        IEnumerable<T> Add(IEnumerable<T> entities);

        T Update(T entity);

        void Update(IEnumerable<T> entities);

        void Delete(TKey id);

        void Delete(T entity);

        void Delete(Expression<Func<T, bool>> predicate);

        void DeleteAll();

        void Drop();

        long Count();

        bool Exists();

        bool Exists(Expression<Func<T, bool>> predicate);
    }

    public interface IBaseRepository<T> : IBaseRepository<T, string>
        where T : IEntity<string>
    {
    }
}
