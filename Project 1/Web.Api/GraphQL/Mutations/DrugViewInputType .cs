using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class DrugViewInputType : InputObjectGraphType
    {
        public DrugViewInputType()
        {
            Name = "DrugViewInput";
            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<StringGraphType>("dosage");
            //Field<StringGraphType>("form");
            //Field<StringGraphType>("AtcCode");
            //Field<StringGraphType>("Presentation");
            //Field<StringGraphType>("Route");
        }
    }
}
