using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class CardiologyOperationInputType : InputObjectGraphType
    {
        public CardiologyOperationInputType()
        {
            Name = "CardiologyOperationInput";

            Field<StringGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("type");
            Field<StringGraphType>("status");
            Field<StringGraphType>("subLocation");
            Field<DateTimeGraphType>("opened");
            Field<DateTimeGraphType>("closed");
            Field<LocationViewInputType>("location");
            Field<StringGraphType>("department");
            Field<DataPartitionInputType>("anesthesia");
            Field<ListGraphType<StringGraphType>>("code");
            Field<DataPartitionInputType>("operationType");
            Field<DataPartitionInputType>("operationPerformed");
            Field<DataPartitionInputType>("operationDiagnosis");
            Field<DataPartitionInputType>("operationPostDiagnosis");
            Field<DataPartitionInputType>("operationPreFindings");
            Field<DataPartitionInputType>("operationCategory");
            Field<DataPartitionInputType>("physicalExam");
            Field<DataPartitionInputType>("surgeons");
            Field<StringGraphType>("operationDetails");
            Field<BooleanGraphType>("isDuplicate");
        }
    }
}
