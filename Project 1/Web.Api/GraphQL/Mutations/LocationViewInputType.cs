using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class LocationViewInputType : InputObjectGraphType
    {
        public LocationViewInputType()
        {
            Name = "LocationViewInputType";
            Field<NonNullGraphType<StringGraphType>>("id");
            Field<StringGraphType>("name");
        }
    }
}
