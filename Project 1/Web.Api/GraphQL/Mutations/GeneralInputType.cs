using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class GeneralInputType : InputObjectGraphType
    {
        public GeneralInputType()
        {
            Name = "GeneralInput";

            Field<ListGraphType<GeneralConditionInputType>>("conditions");
            Field<GeneralMedicalHistoryInputType>("medicalHistory");
        }
    }
}
