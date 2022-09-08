using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using MongoDB.Bson;
using Rhino.Etl.Core;

namespace Etl.Processes.PatientOperations
{
    public class ReadTargetPatients : InputMongoDbOperation<Contact>
    {
        public ReadTargetPatients() : base("DestinationDb")
        {
            _collection = _database.GetCollection<Contact>("Contacts");
        }

        protected override Row CreateRowFromDocument(Contact document)
        {
            var row = new Row();
            row["Id"] = document.Id;
            row["TenantId"] = document.TenantId;
            row["Name"] = document.Name;
            row["BirthDate"] = document.BirthDate;
            row["City"] = document.City;
            row["Country"] = document.Country;
            row["CreatedOn"] = document.CreatedOn;
            row["Email"] = document.Email;
            row["Gender"] = document.Gender;
            row["Modified"] = document.Modified;
            row["Occupation"] = document.Occupation;
            row["Partner"] = document.Partner;
            row["Telephone"] = document.Telephone;

            if(document.PatientInfo != null)
            {
                row["BloodTypeKey"] = document.PatientInfo.BloodTypeKey;
                row["EmergancyContact"] = document.PatientInfo.EmergancyContact;
                row["EntryDate"] = document.PatientInfo.EntryDate;
                row["FileNumber"] = document.PatientInfo.FileNumber;
                row["Flags"] = document.PatientInfo.Flags;
                row["Grantors"] = document.PatientInfo.Grantors;
                row["IdentityNumber"] = document.PatientInfo.IdentityNumber;
                row["LastSeen"] = document.PatientInfo.LastSeen;
                row["MediaFiles"] = document.PatientInfo.MediaFiles;
                row["MaritalStatusKey"] = document.PatientInfo.MaritalStatusKey;
                row["Referral"] = document.PatientInfo.Referral;
                row["Specialities"] = document.PatientInfo.Specialities;
                row["TotalDigitizedData"] = document.PatientInfo.TotalDigitizedData;
            }
           

            return row;
        }

        protected override void PrepareFilter(BsonDocument doc)
        {
            // Get all 
        }
    }

}
