using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class CardiologyMedicalHistory : MedicalHistory
    {
        public CardiologyMedicalHistory()
        {
            Allergies = new MedicalHistoryAlert();
            FamilyHistory = new MedicalHistoryAlert();
            MedicalIssues = new MedicalHistoryAlert();
            CardioVascular = new MedicalHistoryAlert();
            Gi = new MedicalHistoryAlert();
            Endocrinology = new MedicalHistoryAlert();
            LungDiseases = new MedicalHistoryAlert();
            Neurology = new MedicalHistoryAlert();
            PhysiomaticDisorder = new MedicalHistoryAlert();
            RiskFactors = new MedicalHistoryAlert();
            Alerts = new MedicalHistoryAlert();
            PastMedication = new MedicalHistoryMedication();
            PresentMedication = new MedicalHistoryMedication();
            SurgicalHistory = new CardiologyMedicalHistorySurgery();
        }

        public MedicalHistoryAlert Allergies { get; set; }
        public MedicalHistoryAlert FamilyHistory { get; set; }
        public MedicalHistoryAlert MedicalIssues { get; set; }
        public MedicalHistoryAlert CardioVascular { get; set; }
        public MedicalHistoryAlert Gi { get; set; }
        public MedicalHistoryAlert Endocrinology { get; set; }
        public MedicalHistoryAlert LungDiseases { get; set; }
        public MedicalHistoryAlert Neurology { get; set; }
        public MedicalHistoryAlert PhysiomaticDisorder { get; set; }
        public MedicalHistoryAlert RiskFactors { get; set; }
        public MedicalHistoryAlert Alerts { get; set; }
        public MedicalHistoryMedication PastMedication { get; set; }
        public MedicalHistoryMedication PresentMedication { get; set; }
        public CardiologyMedicalHistorySurgery SurgicalHistory { get; set; }
    }
}
