using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class ScheduleType : ObjectGraphType<ScheduleModel>
    {
        public ScheduleType()
        {
            Name = "Schedule";

            Field(h => h.Id, nullable: true).Description("The id of the schedule.");
            Field(h => h.StartHour, nullable: true).Description("The startHour of the schedule.");
            Field(h => h.EndHour, nullable: true).Description("The startHour of the schedule.");
            Field(h => h.DisplayRota, nullable: true, type: typeof(BooleanGraphType)).Description("Whether to mark rota on schedule cells or not.");
        }
    }
}
