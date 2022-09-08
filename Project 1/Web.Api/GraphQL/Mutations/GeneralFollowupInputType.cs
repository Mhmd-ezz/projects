using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class GeneralFollowupInputType : InputObjectGraphType
    {
        public GeneralFollowupInputType()
        {
            Name = "GeneralFollowupInput";

            Field<StringGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("type");
            Field<StringGraphType>("status");
            Field<StringGraphType>("subLocation");
            Field<DateTimeGraphType>("opened");
            Field<DateTimeGraphType>("closed");
            Field<LocationViewInputType>("location");
            Field<DataPartitionInputType>("subjective");
            Field<DataPartitionInputType>("medication");
            Field<DataPartitionInputType>("otherTreatments");
            Field<DataPartitionInputType>("assessment");
            Field<DataPartitionInputType>("consultation");
            Field<DataPartitionInputType>("physicalExam");
            Field<DataPartitionInputType>("laboratory");
            Field<DataPartitionInputType>("radio");
            Field<DataPartitionInputType>("note");
            Field<DataPartitionInputType>("diagnosis");
            Field<BooleanGraphType>("isDuplicate");
            //Field<MediaRootInputType>("mediaFiles");
            Field<ListGraphType<MedicationInputType>>("medications");
            Field<BooleanGraphType>("isHidden");
        }
    }
}
