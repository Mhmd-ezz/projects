using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class MedicalHistoryMedicationInputType : InputObjectGraphType
    {
        public MedicalHistoryMedicationInputType()
        {
            Name = "MedicalHistoryMedicationInput";

            Field<BooleanGraphType>("alert");
            Field<DateTimeGraphType>("lastUpdate");
            Field<ListGraphType<MedicationInputType>>("Data");
        }
    }
}