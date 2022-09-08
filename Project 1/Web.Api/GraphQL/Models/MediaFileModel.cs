using System;
using System.Collections.Generic;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class MediaFileModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public string TenantId { get; set; }
        public string PatientId { get; set; }
        public string PatientName { get; set; }
        public string Speciality { get; set; }
        public string ConditionId { get; set; }
        public string ActivityType { get; set; }
        public string ActivityId { get; set; }
        public string TicketNumber { get; set; }
        public bool IsDeleted { get; set; }
      
        public DataPartitionModel Tags { get; set; }

        public List<string> SystemTagging { get; set; }

        public DateTime? DeletedOn { get; set; }
        public DateTime? Modified { get; set; }

    }
}