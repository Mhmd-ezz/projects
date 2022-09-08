using System.Configuration;
using System.Data.SqlClient;
using Rhino.Etl.Core;
using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using MongoDB.Bson;
using Cmd.Extenstions;
using Medcilia.Clinic.Infrastructure.Enums;
using System.Collections.Generic;
using System;
using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Helper;

namespace Etl.Processes.PatientOperations
{
    public class InsertNewPatients : OutputMongoDbOperation<Contact>
    {
        private InsertLookup _insertLookup;
        private InsertDrug _insertDrug;

        public InsertNewPatients() : base("DestinationDb")
        {
            _collection = _database.GetCollection<Contact>("Contacts");
            _insertLookup = new InsertLookup();
            _insertDrug = new InsertDrug();
        }


        protected override Contact CreateDocumentFromRow(Row row)
        {
            var patient = new Contact();
            patient.ContactType = ContactTypeEnum.Patient;
            patient.PatientInfo = new Patient();

            patient.TenantId = new DocumentRef("Tenants", (string)row["tenantId"]);
            patient.City = row["City"].Sanitize() + " " + (string)row["Street"].Sanitize();
            //patient.Referral = new List<string>(new string[] { (string)row["Referrer"].Sanitize() });
            patient.Email = row["Email"].Sanitize();
            //patient.Specialities = new Speciality();


            var id = row["id"] == null || Guid.TryParse(row["id"].ToString(), out Guid result) ? null : (string)row["id"];
            patient.Id = id;
            patient.Name = row["FirstName"].Sanitize() + " " + row["MiddelName"].Sanitize() + " " + row["LastName"].Sanitize();
            patient.Telephone = (string)row["Mobile"] ;
            //patient.Telephone = (string)row["Phone"];
            patient.Gender = row["Gender"].Sanitize();
            patient.BirthDate = row["Birthday"] == null ? DateTime.MinValue : (DateTime)row["Birthday"];
            patient.Occupation = row["Occupation"].Sanitize();
            patient.Partner = null;
            patient.Country = row["Country"].Sanitize();
            patient.City = (string)row["City"];
            patient.Email = row["Email"].Sanitize();

            patient.PatientInfo.EntryDate = row["EntryDate"] == null ? DateTime.MinValue : (DateTime)row["EntryDate"];
            patient.PatientInfo.BloodType = row["BloodType"] == null ?
                BloodTypeEnum.NotSet :
                LocalizedKeyedEnumeration.FromKey<BloodTypeEnum>((string)row["BloodType"]);
            patient.PatientInfo.MaritalStatus = row["MartialStatus"] == null ?
                MaritalStatusEnum.NotSet :
                LocalizedKeyedEnumeration.FromKey<MaritalStatusEnum>((string)row["MartialStatus"]);
            patient.PatientInfo.Referral = row["Referrer"] == null ?
                new List<string>() :
                new List<string> { (string)row["Referrer"] };

            //patient.PatientInfo.EmergancyContact = "";
            //patient.PatientInfo.FileNumber = "";
            //patient.PatientInfo.IdentityNumber = "";
            //patient.PatientInfo.Grantors = "";
            //patient.PatientInfo.MediaFiles = "";
            //patient.PatientInfo.Flags = "";
            //patient.PatientInfo.LastSeen = "";



            patient.PatientInfo.Specialities = new Speciality();
            patient.PatientInfo.Specialities.General = new General();

            patient.PatientInfo.Specialities.General.MedicalHistory = new GeneralMedicalHistory();

            if (row["PastMedicalHistory"] != null)
            {
                var split = row["PastMedicalHistory"].Sanitize().Split('\n');
                foreach (string text in split)
                {
                    patient.PatientInfo.Specialities.General.MedicalHistory.MedicalIssues.Data.Add(_insertLookup.ResolveLookup("medical_issue", text));
                }
            }

            if (row["Allergies"] != null)
            {
                var split = row["Allergies"].Sanitize().Split('\n');
                foreach (string text in split)
                {
                    patient.PatientInfo.Specialities.General.MedicalHistory.Allergies.Data.Add(_insertLookup.ResolveLookup("allergies", text));
                }
            }

            if (row["SurgicalHistory"] != null)
            {
                var split = row["SurgicalHistory"].Sanitize().Split('\n');
                foreach (string text in split)
                {
                    var surgery = new SurgicalHistory();
                    surgery.What = text;
                    patient.PatientInfo.Specialities.General.MedicalHistory.SurgicalHistory.Data.Add(surgery);
                }
            }

            var createdDate = (DateTime?)row["CreatedDate"];
            patient.CreatedOn = createdDate != null && createdDate.Value != DateTime.MinValue
                ? createdDate.Value : DateTime.Now;
            patient.Modified = patient.CreatedOn;

            patient.PatientInfo.CreatedOn = patient.CreatedOn;
            patient.PatientInfo.Modified = patient.CreatedOn;


            return patient;
        }


        protected override void Execute(Contact doc)
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
