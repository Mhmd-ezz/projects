using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class GeneralMedicalHistory : MedicalHistory
    {
        public GeneralMedicalHistory()
        {
            Allergies = new MedicalHistoryAlert();
            FamilyHistory = new MedicalHistoryAlert();
            MedicalIssues = new MedicalHistoryAlert();
            Alerts = new MedicalHistoryAlert();
            PastMedication = new MedicalHistoryMedication();
            PresentMedication = new MedicalHistoryMedication();
            SurgicalHistory = new MedicalHistorySurgery();
        }

        public MedicalHistoryAlert Allergies { get; set; }
        public MedicalHistoryAlert FamilyHistory { get; set; }
        public MedicalHistoryAlert MedicalIssues { get; set; }
        public MedicalHistoryAlert Alerts { get; set; }
        public MedicalHistoryMedication PastMedication { get; set; }
        public MedicalHistoryMedication PresentMedication { get; set; }
        public MedicalHistorySurgery SurgicalHistory { get; set; }
    }
}
