using MongoDB.Bson;
using MongoDB.Driver;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Enumerables;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Etl.Processes.Common
{

    /// <summary>
    /// Generic output command operation
    /// </summary>
    public abstract class OutputMongoDbOperation<TDocument> : AbstractMongoDbOperation
    {
        protected static IMongoCollection<TDocument> _collection;

        /// <summary>
        /// Initializes a new instance of the <see cref="OutputCommandOperation"/> class.
        /// </summary>
        /// <param name="connectionStringName">Name of the connection string.</param>
        public OutputMongoDbOperation(string connectionStringName)
            : this(ConfigurationManager.ConnectionStrings[connectionStringName])
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="OutputCommandOperation"/> class.
        /// </summary>
        /// <param name="connectionStringSettings">Connection string settings to use.</param>
        public OutputMongoDbOperation(ConnectionStringSettings connectionStringSettings)
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
            
            foreach (Row row in new SingleRowEventRaisingEnumerator(this, rows))
            {
                var document = CreateDocumentFromRow(row);
                Execute(document);
            }
           
            yield break;                       
        }

        /// <summary>
        /// Creates a row from the reader.
        /// </summary>
        /// <param name="reader">The reader.</param>
        /// <returns></returns>
        protected abstract TDocument CreateDocumentFromRow(Row row);

        protected abstract void Execute(TDocument doc);


    }
}
