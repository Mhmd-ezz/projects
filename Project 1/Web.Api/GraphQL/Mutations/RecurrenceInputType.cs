using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class RecurrenceInputType : InputObjectGraphType
    {
        public RecurrenceInputType()
        {
            Name = "RecurrenceInput";
            Field<DateTimeGraphType>("startTime");
            Field<DateTimeGraphType>("endTime");
            Field<StringGraphType>("rule");
        }
    }
}
