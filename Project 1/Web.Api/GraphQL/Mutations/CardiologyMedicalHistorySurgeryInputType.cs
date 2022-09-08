using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class CardiologyMedicalHistorySurgeryInputType : InputObjectGraphType
    {
        public CardiologyMedicalHistorySurgeryInputType()
        {
            Name = "CardiologyMedicalHistorySurgeryInput";

            Field<BooleanGraphType>("alert");
            Field<DateTimeGraphType>("lastUpdate");
            Field<ListGraphType<CardiologySurgicalHistoryInputType>>("Data");
        }
    }
}