using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class PatientMedicationsHistoryInputType : InputObjectGraphType
    {
        public PatientMedicationsHistoryInputType()
        {
            Name = "PatientMedicationsHistoryInput";

            Field<DateTimeGraphType>("startDate");
            Field<DateTimeGraphType>("endDate");
            Field<StringGraphType>("duration");
            Field<StringGraphType>("frequency");
            Field<StringGraphType>("note");
            Field<StringGraphType>("status");
        }
    }
}
