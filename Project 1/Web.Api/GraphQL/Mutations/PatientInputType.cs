using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Types;
using Microsoft.CodeAnalysis;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class PatientInputType : InputObjectGraphType
    {
        public PatientInputType()
        {
            Name = "PatientInput";

            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<StringGraphType>>("gender");
            Field<NonNullGraphType<StringGraphType>>("telephone");
            Field<ListGraphType<StringGraphType>>("contactNumbers");
            Field<NonNullGraphType<DateTimeGraphType>>("birthDate");
            Field<StringGraphType>("occupation");
            Field<StringGraphType>("partner");
            Field<StringGraphType>("country");
            Field<StringGraphType>("city");
            Field<StringGraphType>("email");
            Field<BooleanGraphType>("isDuplicate");
            Field<StringGraphType>("identityNumber");
            Field<DateTimeGraphType>("createdOn");
            Field<DateTimeGraphType>("modified");
            Field<PatientInfoInputType>("patientInfo");
        }
    }
}
