using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class CardiologyMedicalHistoryModel 
    {
        public MedicalHistoryAlertModel Allergies { get; set; }
        public MedicalHistoryAlertModel FamilyHistory { get; set; }
        public MedicalHistoryAlertModel MedicalIssues { get; set; }
        public MedicalHistoryAlertModel CardioVascular { get; set; }
        public MedicalHistoryAlertModel Gi { get; set; }
        public MedicalHistoryAlertModel Endocrinology { get; set; }
        public MedicalHistoryAlertModel LungDiseases { get; set; }
        public MedicalHistoryAlertModel Neurology { get; set; }
        public MedicalHistoryAlertModel PhysiomaticDisorder { get; set; }
        public MedicalHistoryAlertModel RiskFactors { get; set; }
        public MedicalHistoryAlertModel Alerts { get; set; }
        public MedicalHistoryMedicationModel PastMedication { get; set; }
        public MedicalHistoryMedicationModel PresentMedication { get; set; }
        public CardiologyMedicalHistorySurgeryModel SurgicalHistory { get; set; }
    }
}
