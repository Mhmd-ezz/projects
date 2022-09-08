using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Types;
using Microsoft.CodeAnalysis;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class ContactInputType : InputObjectGraphType
    {
        public ContactInputType()
        {
            Name = "ContactInput";

            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<StringGraphType>>("telephone");
            Field<ListGraphType<StringGraphType>>("contactNumbers");
            Field<StringGraphType>("gender");
            Field<DateTimeGraphType>("birthDate");
            Field<StringGraphType>("occupation");
            Field<StringGraphType>("partner");
            Field<StringGraphType>("country");
            Field<StringGraphType>("city");
            Field<StringGraphType>("email");
            Field<StringGraphType>("identityNumber");
            Field<DateTimeGraphType>("createdOn");
            Field<DateTimeGraphType>("modified");
            Field<StringGraphType>("contactType");
            Field<BooleanGraphType>("isDuplicate");
            //Field<PatientInputType>("patientInfo");
        }
    }
}
