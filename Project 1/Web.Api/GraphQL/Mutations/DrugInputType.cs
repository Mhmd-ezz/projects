using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class DrugInputType : InputObjectGraphType
    {
        public DrugInputType()
        {
            Name = "DrugInput";
            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<StringGraphType>("dosage");
            Field<StringGraphType>("atcCode");
            //Field<StringGraphType>("presentation");
            Field<StringGraphType>("form");
            //Field<StringGraphType>("agent");
            Field<StringGraphType>("route");
            //Field<StringGraphType>("laboratory");
            //Field<StringGraphType>("country");
            //Field<StringGraphType>("price");
        }
    }
}
