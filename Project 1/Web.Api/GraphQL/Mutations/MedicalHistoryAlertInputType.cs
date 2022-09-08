using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class MedicalHistoryAlertInputType : InputObjectGraphType
    {
        public MedicalHistoryAlertInputType()
        {
            Name = "MedicalHistoryAlertInput";

            Field<BooleanGraphType>("alert");
            Field<DateTimeGraphType>("lastUpdate");
            Field<ListGraphType<LookupViewModelInputType>>("Data");
        }
    }
}