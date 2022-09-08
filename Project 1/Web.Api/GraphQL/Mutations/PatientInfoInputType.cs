using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Types;
using Microsoft.CodeAnalysis;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class PatientInfoInputType : InputObjectGraphType
    {
        public PatientInfoInputType()
        {
            Name = "PatientInfoInput";

            Field<DateTimeGraphType>("entryDate");
            Field<DateTimeGraphType>("lastSeen");
            Field<StringGraphType>("maritalStatus");
            Field<ListGraphType<StringGraphType>>("referral");
            Field<StringGraphType>("emergancyContact");
            Field<StringGraphType>("fileNumber");
            Field<ListGraphType<GrantorInputType>>("grantors");
            Field<ListGraphType<TagInputType>>("tags");
            Field<StringGraphType>("bloodType");
            Field<IntGraphType>("totalDigitizedData");
            Field<ListGraphType<StringGraphType>>("flags");
            Field<DateTimeGraphType>("createdOn");
            Field<DateTimeGraphType>("modified");
            //Field<MediaRootInputType> ("mediaFiles");
            Field<SpecialityInputType>("specialities");
        }
    }
}
