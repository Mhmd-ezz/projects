using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class LocationInputType : InputObjectGraphType
    {
        public LocationInputType()
        {
            Name = "LocationInput";
            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<StringGraphType>("contact");
            Field<StringGraphType>("address");
            Field<StringGraphType>("type");
            Field<ListGraphType<StringGraphType>>("subLocations");
            //Field<StringGraphType>("homePlanet");
        }
    }
}
