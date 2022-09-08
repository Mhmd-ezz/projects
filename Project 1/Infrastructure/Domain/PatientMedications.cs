using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Medications")]

    public class PatientMedications : TenantedEntity
    {
         public PatientMedications()
        {
            CreatedOn = DateTime.Now;
            History = new List<PatientMedicationsHistory>();
        }
        public string MedicationId { get; set; }
        public string PatientId { get; set; }
        public string ConditionId { get; set; }
        public string FollowupId { get; set; }
        public MongoDBRef Drug { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public List<PatientMedicationsHistory> History { get; set; }
        public bool IsActive { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
