using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class GeneralConditionInputType : InputObjectGraphType
    {
        public GeneralConditionInputType()
        {
            Name = "GeneralConditionInput";

            Field<StringGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("type");
            Field<StringGraphType>("status");
            Field<StringGraphType>("subLocation");
            Field<DateTimeGraphType>("opened");
            Field<DateTimeGraphType>("closed");
            Field<LocationViewInputType>("location");
            Field<DataPartitionInputType>("cheifComplaint");
            Field<DataPartitionInputType>("presentHistory");
            Field<DataPartitionInputType>("diagnosis");
            Field<DataPartitionInputType>("differentialDiagnosis");
            Field<DataPartitionInputType>("consultation");
            Field<DataPartitionInputType>("otherTreatments");
            Field<DataPartitionInputType>("physicalExam");
            Field<DataPartitionInputType>("laboratory");
            Field<DataPartitionInputType>("radio");
            Field<DataPartitionInputType>("note");
            Field<GeneralActivitiesInputType>("activities");
            Field<BooleanGraphType>("isDuplicate");
            //Field<MediaRootInputType>("mediaFiles");
            Field<ListGraphType<MedicationInputType>>("medications");
            Field<BooleanGraphType>("isHidden");
        }
    }
}
