using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class PatientMedicationsModel
    {
        public string MedicationId { get; set; }
        public string PatientId { get; set; }
        public string ConditionId { get; set; }
        public string FollowupId { get; set; }
        public DrugViewModel Drug { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public List<PatientMedicationsHistoryModel> History { get; set; }
        public bool IsActive { get; set; }
        public string Reason { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
