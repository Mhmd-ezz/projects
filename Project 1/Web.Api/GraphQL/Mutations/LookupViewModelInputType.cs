using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class LookupViewModelInputType : InputObjectGraphType
    {
        public LookupViewModelInputType()
        {
            Name = "LookupViewModelInput";
            Field<NonNullGraphType<StringGraphType>>("group");
            Field<NonNullGraphType<StringGraphType>>("value");
            Field<NonNullGraphType<StringGraphType>>("text");
        }
    }
}
