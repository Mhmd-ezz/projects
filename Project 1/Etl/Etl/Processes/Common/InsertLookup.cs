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
    public class InsertLookup : OutputMongoDbOperation<LookUp>
    {
        public InsertLookup() : base("DestinationDb")
        {
            _collection = _database.GetCollection<LookUp>("Lookups");
        }

        protected override LookUp CreateDocumentFromRow(Row row)
        {
            return null;
        }

        protected override void Execute(LookUp doc)
        {
        }


        public MongoDBRef ResolveLookup(string group, string text)
        {
            LookUp lookup = GetLookupByText(group, text);
            if (lookup == null)
            {
                var newLookup = new LookUp
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    TenantId = new DocumentRef("Tenants", "5c7d17ee7689122114953b99"),
                    GroupKey = group,
                    Value = (GetLookupByGroup(group).Count + 1).ToString(),
                    Text = text
                };
                InsertNewLookup(newLookup);
                lookup = newLookup;
            }

            var dbRef = new MongoDBRef("Lookups", lookup.Id);

            return dbRef;
        }

        public LookUp GetLookupByText(string group, string text)
        {
            var LookupsCollection = _database.GetCollection<LookUp>("Lookups");

            var builder = Builders<LookUp>.Filter;
            var filter = builder.Eq(s => s.GroupKey, group) &
                         builder.Eq(s => s.TenantId, new DocumentRef("Tenants", "5c7d17ee7689122114953b99")) &
                         builder.Eq(s => s.Text, text.ToLower());
            return LookupsCollection.Find(filter).FirstOrDefault();
        }

        public List<LookUp> GetLookupByGroup(string @group)
        {
            var LookupsCollection = _database.GetCollection<LookUp>("Lookups");

            var builder = Builders<LookUp>.Filter;
            var filter = builder.Eq(s => s.TenantId, new DocumentRef("Tenants", "5c7d17ee7689122114953b99")) &
                         builder.Eq(s => s.GroupKey, group);

            return LookupsCollection.Find(filter).ToList();
        }

        public void InsertNewLookup(LookUp doc)
        {
            var LookupsCollection = _database.GetCollection<LookUp>("Lookups");
            LookupsCollection.InsertOne(doc);
        }
    }
}
