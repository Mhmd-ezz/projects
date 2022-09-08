using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class TicketInputType : InputObjectGraphType
    {
        public TicketInputType()
        {
            Name = "TicketInput";
            Field<StringGraphType>("id");
            Field<StringGraphType>("ticketNumber");
            Field<StringGraphType>("tenantName");            
            Field<StringGraphType>("subject");
            Field<StringGraphType>("details");            
            Field<BooleanGraphType>("attachFile");
            Field<BooleanGraphType>("isReadByAdmin");
            Field<BooleanGraphType>("isReadByClient");
            Field<IntGraphType>("status");
            Field<DateTimeGraphType>("TicketDate");
            Field<ListGraphType<TicketMessagesInputType>>("messages");
        }
    }
}
