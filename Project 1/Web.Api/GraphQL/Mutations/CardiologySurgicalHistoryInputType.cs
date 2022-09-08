using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class CardiologySurgicalHistoryInputType : InputObjectGraphType
    {
        public CardiologySurgicalHistoryInputType()
        {
            Name = "CardiologySurgicalHistoryInput";

            Field<StringGraphType>("type");
            Field<ListGraphType<LookupViewModelInputType>>("what");
            Field<DateTimeGraphType>("when");
            Field<StringGraphType>("note");
        }
    }
}