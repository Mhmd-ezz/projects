using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class SurgicalHistoryInputType : InputObjectGraphType
    {
        public SurgicalHistoryInputType()
        {
            Name = "SurgicalHistoryInput";

            Field<StringGraphType>("what");
            Field<DateTimeGraphType>("when");
            Field<StringGraphType>("note");
        }
    }
}