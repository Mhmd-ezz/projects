using MongoDB.Bson;
using MongoDB.Driver;
using Rhino.Etl.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Etl.Processes.Common
{

    /// <summary>
    /// Generic input command operation
    /// </summary>
    public abstract class InputMongoDbOperation<TDocument> : AbstractMongoDbOperation
    {
        protected static IMongoCollection<TDocument> _collection;

        /// <summary>
        /// Initializes a new instance of the <see cref="OutputCommandOperation"/> class.
        /// </summary>
        /// <param name="connectionStringName">Name of the connection string.</param>
        public InputMongoDbOperation(string connectionStringName)
            : this(ConfigurationManager.ConnectionStrings[connectionStringName])
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="OutputCommandOperation"/> class.
        /// </summary>
        /// <param name="connectionStringSettings">Connection string settings to use.</param>
        public InputMongoDbOperation(ConnectionStringSettings connectionStringSettings)
            : base(connectionStringSettings)
        {
            UseTransaction = true;            
        }

        /// <summary>
        /// Executes this operation
        /// </summary>
        /// <param name="rows">The rows.</param>
        /// <returns></returns>
        public override IEnumerable<Row> Execute(IEnumerable<Row> rows)
        {
            if(_collection == null)
                 throw new Exception("No collection was setup for this operation");
            
            var filter = new BsonDocument();
            PrepareFilter(filter);
            var documents = _collection.Find(filter)
                .ToListAsync()
                .ConfigureAwait(true)
                .GetAwaiter()
                .GetResult();
            foreach (var document in documents)
            {
                yield return CreateRowFromDocument(document);
            }            
        }

        /// <summary>
        /// Creates a row from the reader.
        /// </summary>
        /// <param name="reader">The reader.</param>
        /// <returns></returns>
        protected abstract Row CreateRowFromDocument(TDocument document);

        /// <summary>
        /// Prepares the command for execution, set command text, parameters, etc
        /// </summary>
        /// <param name="cmd">The command.</param>
        protected abstract void PrepareFilter(BsonDocument doc);
    }
}
