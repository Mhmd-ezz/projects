using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class MedicationInputType : InputObjectGraphType
    {
        public MedicationInputType()
        {
            Name = "MedicationInput";
            Field<StringGraphType>("frequency");
            Field<NonNullGraphType<DrugViewInputType>>("drug");
            Field<StringGraphType>("note");
            Field<StringGraphType>("usageType");
            Field<StringGraphType>("describedBy");
            Field<BooleanGraphType>("noSubstitutes");
            Field<BooleanGraphType>("isActive");
            Field<DateTimeGraphType>("startDate");
            Field<DateTimeGraphType>("endDate");
        }
    }
}
