using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Helper;
using Rhino.Etl.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Etl.Processes.ImagesOperations
{
    public class InsertNewImages : OutputMongoDbOperation<MediaFile>
    {
        public InsertNewImages() : base("DestinationDb")
        {
            _collection = _database.GetCollection<MediaFile>("MediaFiles");

        }
        protected override MediaFile CreateDocumentFromRow(Row row)
        {
            var mediaFile = new MediaFile();

            mediaFile = (MediaFile)row["@@mediaFile"];
            var tenant = (string)row["tenantId"];
            mediaFile.TenantId = new DocumentRef("Tenants", (string)row["tenantId"]);

            return mediaFile;

        }

        protected override void Execute(MediaFile doc)
        {
            try
            {
                _collection.InsertOne(doc);

            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
        }
    }
}
