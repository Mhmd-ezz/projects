using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class PatientMedicationsInputType: InputObjectGraphType
    {
        public PatientMedicationsInputType()
        {
            Name = "PatientMedicationsInput";

            Field<StringGraphType>("medicationId");
            Field<StringGraphType>("patientId");
            Field<StringGraphType>("conditionId");
            Field<StringGraphType>("followupId");
            Field<DrugViewInputType>("drug");
            Field<DateTimeGraphType>("startTime");
            Field<DateTimeGraphType>("endTime");
            Field<StringGraphType>("reason");
            Field<BooleanGraphType>("IsActive");
            Field<ListGraphType<PatientMedicationsHistoryInputType>>("history");


        }
    }
}
