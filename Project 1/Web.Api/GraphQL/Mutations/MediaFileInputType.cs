using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class MediaFileInputType : InputObjectGraphType
    {
        public MediaFileInputType()
        {
            Name = "MediaFileInput";
            Field<StringGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("path");
            Field<StringGraphType>("type");
            Field<StringGraphType>("size");
            Field<StringGraphType>("tenantId");
            Field<StringGraphType>("patientId");
            Field<StringGraphType>("patientName");
            Field<StringGraphType>("speciality");
            Field<StringGraphType>("conditionId");
            Field<StringGraphType>("activityType");
            Field<StringGraphType>("activityId");
            Field<StringGraphType>("ticketNumber");
            Field<BooleanGraphType>("isDeleted");
            Field<DateTimeGraphType>("deletedOn");
            Field<DateTimeGraphType>("modified");
            Field<DataPartitionInputType>("tags");
            Field<ListGraphType<StringGraphType>>("systemTagging");

        }
    }
}
