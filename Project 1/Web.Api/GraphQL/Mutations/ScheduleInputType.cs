using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class ScheduleInputType : InputObjectGraphType
    {
        public ScheduleInputType()
        {
            Name = "ScheduleInput";
            Field<StringGraphType>("id");
            Field<StringGraphType>("startHour");
            Field<StringGraphType>("endHour");
            Field<BooleanGraphType>("displayRota");
        }
    }
}
