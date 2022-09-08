using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Helper;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using MongoDB.Bson;
using MongoDB.Driver;
using Rhino.Etl.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Etl.Processes.Common
{
    public class InsertDrug : OutputMongoDbOperation<Drug>
    {
        public InsertDrug() : base("DestinationDb")
        {
            _collection = _database.GetCollection<Drug>("Drugs");
        }

        protected override Drug CreateDocumentFromRow(Row row)
        {
            return null;
        }

        protected override void Execute(Drug doc)
        {
        }


        public MongoDBRef ResolveDrug(string text)
        {
            Drug drug = GetDrugByText(text);
            if (drug == null)
            {
                var newDrug = new Drug
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    TenantId = new DocumentRef("Tenants", "5c7d17ee7689122114953b99"),
                    Name = text
                };
                InsertNewDrug(newDrug);
                drug = newDrug;
            }

            var dbRef = new MongoDBRef("Lookups", drug.Id);

            return dbRef;
        }

        public Drug GetDrugByText( string text)
        {
            var DrugCollection = _database.GetCollection<Drug>("Drugs");

            var builder = Builders<Drug>.Filter;
            var filter = 
                         builder.Eq(s => s.TenantId, new DocumentRef("Tenants", "5c7d17ee7689122114953b99")) &
                         builder.Eq(s => s.Name, text.ToLower());

            return DrugCollection.Find(filter).FirstOrDefault();
        }

        public void InsertNewDrug(Drug doc)
        {
            var DrugCollection = _database.GetCollection<Drug>("Drugs");
            DrugCollection.InsertOne(doc);
        }
    }
}
