using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class MedicalHistoryMedicationType : ObjectGraphType<MedicalHistoryMedicationModel>
    {
        public MedicalHistoryMedicationType()
        {
            Name = "MedicalHistoryMedication";

            Field(h => h.Alert, nullable: true).Description("");
            Field(h => h.LastUpdate, nullable: true).Description("");
            Field(h => h.Data, nullable: true, type: typeof(ListGraphType<MedicationType>)).Description("");
        }
    }
}
