using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class MedicalHistorySurgeryInputType : InputObjectGraphType
    {
        public MedicalHistorySurgeryInputType()
        {
            Name = "MedicalHistorySurgeryInput";

            Field<BooleanGraphType>("alert");
            Field<DateTimeGraphType>("lastUpdate");
            Field<ListGraphType<SurgicalHistoryInputType>>("Data");
        }
    }
}