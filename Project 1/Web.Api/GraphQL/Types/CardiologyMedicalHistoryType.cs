using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class CardiologyMedicalHistoryType : ObjectGraphType<CardiologyMedicalHistoryModel>
    {
        public CardiologyMedicalHistoryType()
        {
            Name = "CardiologyMedicalHistory";

            Field(h => h.Alerts, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("Alerts");
            Field(h => h.Allergies, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.FamilyHistory, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.MedicalIssues, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.CardioVascular, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.Gi, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.Endocrinology, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.LungDiseases, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.Neurology, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.PhysiomaticDisorder, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.RiskFactors, nullable: true, type: typeof(MedicalHistoryAlertType)).Description("");
            Field(h => h.PastMedication, nullable: true, type: typeof(MedicalHistoryMedicationType)).Description("");
            Field(h => h.PresentMedication, nullable: true, type: typeof(MedicalHistoryMedicationType)).Description("");
            Field(h => h.SurgicalHistory, nullable: true, type: typeof(CardiologyMedicalHistorySurgeryType)).Description("");
        }
    }
}
