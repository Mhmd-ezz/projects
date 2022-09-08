using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class RecurrenceType : ObjectGraphType<RecurrenceModel>
    {
        public RecurrenceType()
        {
            Name = "Recurrence";

            Field(h => h.StartTime, nullable: true ,type: typeof(DateTimeGraphType)).Description("The startTime of the recurrence.");
            Field(h => h.EndTime, nullable: true, type: typeof(DateTimeGraphType)).Description("The endTime of the recurrence.");
            Field(h => h.Rule, nullable: true).Description("The rule of the recurrence.");

        }
    }
}
