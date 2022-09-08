using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class CardiologyInputType : InputObjectGraphType
    {
        public CardiologyInputType()
        {
            Name = "CardiologyInput";

            Field<ListGraphType<CardiologyConditionInputType>>("conditions");
            Field<CardiologyMedicalHistoryInputType>("medicalHistory");
        }
    }
}
