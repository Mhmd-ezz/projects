using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class DataPartitionInputType : InputObjectGraphType
    {
        public DataPartitionInputType()
        {
            Name = "DataPartitionInput";

            Field<ListGraphType<LookupViewModelInputType>>("text");
            Field<ListGraphType<MediaPartitionInputType>>("media");
            Field<ListGraphType<StringGraphType>>("tags");
        }
    }
}
