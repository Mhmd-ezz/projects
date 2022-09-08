using System.Collections.Generic;
using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using MongoDB.Driver;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using Cmd.Extenstions;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson;

namespace Etl.Processes.PatientOperations
{

    public class UpdateExistingPatients : OutputMongoDbOperation<Contact>
    {
        public UpdateExistingPatients() : base("DestinationDb")
        {
            _collection = _database.GetCollection<Contact>("Contacts");
        }


        protected override Contact CreateDocumentFromRow(Row row)
        {

            var patient = new Contact();
            patient.Id = (string)row["id"];
            patient.Name = row["FirstName"].Sanitize() + " " + row["MiddelName"].Sanitize() + " " + row["LastName"].Sanitize();
            patient.Telephone = (string)row["Mobile"]; // @ Mobile field in source is the primary field and used as key (rather than telephone)

            if (row["Specialities"] != null && patient.PatientInfo == null)
                patient.PatientInfo = new Patient();

            patient.PatientInfo.Specialities = (Speciality)row["Specialities"];
            //patient.CreatedOn = (System.DateTime)row["CreatedDate"];
            //patient.Modified = (System.DateTime)row["ModifiedDate"];
            //patient.EntryDate = (System.DateTime)row["EntryDate"];
            //patient.BirthDate = (System.DateTime)row["Birthday"];
            //patient.BloodTypeKey = (string)row["BloodType"];
            //patient.MaritalStatusKey = (string)row["MartialStatus"];
            //patient.Occupation = row["Occupation"].Sanitize();
            //patient.Gender = row["Gender"].Sanitize();
            //patient.Telephone = (string)row["Mobile"];
            //patient.Email = row["Email"].Sanitize();
            //patient.Country = row["Country"].Sanitize();
            //patient.City = row["City"].Sanitize() + " " + (string)row["Street"].Sanitize();
            //patient.Referral = new List<string>(new string[] { (string)row["Referrer"].Sanitize() });
            //patient.Email = row["Email"].Sanitize();



            return patient;
        }


        protected override void Execute(Contact doc)
        {
            var filter = Builders<Contact>.Filter.Eq(e => e.Id, doc.Id);
            var update = Builders<Contact>.Update


                .Set(x => x.Name, doc.Name)
                .Set(x => x.Telephone, doc.Telephone)
                .Set(x => x.PatientInfo.Specialities, doc.PatientInfo.Specialities)
                //.Set(x => x.Tags, file.Tags)
                //.Set(x => x.SystemTags, file.SystemTags)
                // .Set(x => x.IsDeleted, file.IsDeleted)
                ;

            _collection.UpdateOne(filter, update);
        }

        //public MongoDBRef ResolveLookup(string group, string text)
        //{
        //    LookUp lookup = GetLookupByText(group, text);
        //    if (lookup == null)
        //    {
        //        var newLookup = new LookUp
        //        {
        //            Id = ObjectId.GenerateNewId().ToString(),
        //            TenantId = new DocumentRef("Tenants", "5d5408a78c13243fc420e7fb"),
        //            GroupKey = group,
        //            Value = (GetLookupByGroup(group).Count + 1).ToString(),
        //            Text = text
        //        };
        //        InsertLookup(newLookup);
        //        lookup = newLookup;
        //    }

        //    var dbRef = new MongoDBRef("Lookups", lookup.Id);

        //    return dbRef;
        //}

        //public LookUp GetLookupByText(string group, string text)
        //{
        //    var LookupsCollection = _database.GetCollection<LookUp>("Lookups");

        //    var builder = Builders<LookUp>.Filter;
        //    var filter = builder.Eq(s => s.GroupKey, group) &
        //                 builder.Eq(s => s.Text, text.ToLower());
        //    return LookupsCollection.Find(filter).FirstOrDefault();
        //}

        //public List<LookUp> GetLookupByGroup(string @group)
        //{
        //    var LookupsCollection = _database.GetCollection<LookUp>("Lookups");

        //    var builder = Builders<LookUp>.Filter;
        //    var filter = builder.Eq(s => s.GroupKey, group);

        //    return LookupsCollection.Find(filter).ToList();
        //}

        //public void InsertLookup(LookUp doc)
        //{
        //    var LookupsCollection = _database.GetCollection<LookUp>("Lookups");
        //    LookupsCollection.InsertOne(doc);
        //}
    }
}
