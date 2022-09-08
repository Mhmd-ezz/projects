using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class GeneralMedicalHistoryType : ObjectGraphType<GeneralMedicalHistoryModel>
    {
        public GeneralMedicalHistoryType()
        {
            Name = "GeneralMedicalHistory";

            Field(h => h.Alerts, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.Allergies, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.FamilyHistory, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.MedicalIssues, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.PastMedication, nullable: true, type: typeof(MedicalHistoryMedicationType)).Description("");
            Field(h => h.PresentMedication, nullable: true, type: typeof(MedicalHistoryMedicationType)).Description("");
            Field(h => h.SurgicalHistory, nullable: true, type: typeof(MedicalHistorySurgeryType)).Description("");
        }
    }
}
