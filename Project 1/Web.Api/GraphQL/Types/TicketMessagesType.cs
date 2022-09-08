using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class TicketMessagesType : ObjectGraphType<TicketMessagesModel>
    {
        public TicketMessagesType()
        {
            Name = "TicketMessages";
            Field(h => h.Message, nullable: true).Description("Message content");
            Field(h => h.RequestBy, nullable: true).Description("name of the requester");
            Field(h => h.MessageDate, nullable: true).Description("date of replay message");
        }
    }
}
