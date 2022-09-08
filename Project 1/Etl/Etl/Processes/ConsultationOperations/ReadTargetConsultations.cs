using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using MongoDB.Bson;
using Rhino.Etl.Core;

namespace Etl.Processes.ConsultationOperations
{
 public class ReadTargetConsultations : InputMongoDbOperation<GeneralCondition>
    {
        public ReadTargetConsultations() : base("DestinationDb")
        {
            //_collection = _database.GetCollection<Patient>("Patients");
        }

        protected override Row CreateRowFromDocument(GeneralCondition document)
        {
            var row = new Row();
            //row["Id"] = document.Id;

            //row["Id"] = document.Id;
            //row["TenantId"] = document.TenantId;
            //row["Name"] = document.Name;
            //row["BirthDate"] = document.BirthDate;
            //row["BloodTypeKey"] = document.BloodTypeKey;
            //row["City"] = document.City;
            //row["Country"] = document.Country;
            //row["CreatedOn"] = document.CreatedOn;
            //row["Email"] = document.Email;
            //row["EmergancyContact"] = document.EmergancyContact;
            //row["EntryDate"] = document.EntryDate;
            //row["FileNumber"] = document.FileNumber;
            //row["Flags"] = document.Flags;
            //row["Gender"] = document.Gender;
            //row["Grantors"] = document.Grantors;
            //row["IdentityNumber"] = document.IdentityNumber;
            //row["LastSeen"] = document.LastSeen;
            //row["MediaFiles"] = document.MediaFiles;
            //row["MaritalStatusKey"] = document.MaritalStatusKey;
            //row["Modified"] = document.Modified;
            //row["Occupation"] = document.Occupation;
            //row["Partner"] = document.Partner;
            //row["Referral"] = document.Referral;
            //row["Specialities"] = document.Specialities;
            //row["Telephone"] = document.Telephone;
            //row["TotalDigitizedData"] = document.TotalDigitizedData;

            return row;
        }

        protected override void PrepareFilter(BsonDocument doc)
        {
            // Get all 
        }
    }

}
