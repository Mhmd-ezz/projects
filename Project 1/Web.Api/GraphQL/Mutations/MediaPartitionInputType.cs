using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class MediaPartitionInputType : InputObjectGraphType
    {
        public MediaPartitionInputType()
        {
            Name = "MediaPartitionInput";

            Field<StringGraphType>("text");
            Field<ListGraphType<StringGraphType>>("tags");
            Field<DateTimeGraphType>("date");
        }
    }
}
