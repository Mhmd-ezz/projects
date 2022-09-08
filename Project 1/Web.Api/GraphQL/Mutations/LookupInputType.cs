using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class LookupInputType : InputObjectGraphType
    {
        public LookupInputType()
        {
            Name = "LookupInput";
            // Field<StringGraphType>("tenantId");
            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("groupKey");
            Field<StringGraphType>("value");
          //  Field<StringGraphType>("symbol");
            Field<NonNullGraphType<StringGraphType>>("text");
            Field<BooleanGraphType>("predefined");
            // //Field<NonNullGraphType<DateGraphType>>("createdDate");
            //  //Field<NonNullGraphType<DateGraphType>>("modifiedDate");

            //   Field<StringGraphType>("description");
            //  //  Field<NonNullGraphType<StringGraphType>>("cultureName");
            //    Field<StringGraphType>("parentValue");
            //   Field<StringGraphType>("parentId");
            //   //Field<NonNullGraphType<IntGraphType>>("order");
        }
    }
}
