using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class GeneralMedicalHistoryModel : MedicalHistoryModel
    {
        public MedicalHistoryAlertModel Allergies { get; set; }
        public MedicalHistoryAlertModel FamilyHistory { get; set; }
        public MedicalHistoryAlertModel MedicalIssues { get; set; }
        public MedicalHistoryAlertModel Alerts { get; set; }
        public MedicalHistoryMedicationModel PastMedication { get; set; }
        public MedicalHistoryMedicationModel PresentMedication { get; set; }
        public MedicalHistorySurgeryModel SurgicalHistory { get; set; }
    }
}
