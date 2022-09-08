using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class TicketMessagesInputType : InputObjectGraphType
    {
        public TicketMessagesInputType()
        {
            Name = "TicketMessagesInput";
            Field<StringGraphType>("Message");
            Field<StringGraphType>("RequestBy");
            Field<DateTimeGraphType>("MessageDate");
        }
    }
}
