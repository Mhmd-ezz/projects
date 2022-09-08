using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class PageResultTicketType : ObjectGraphType<PageResultTicketModel>
    {
        public PageResultTicketType()
        {
            Name = "PageResultTicket";

            Field(h => h.Count, nullable: true).Description("count of the tickets.");

            Field(h => h.Items, nullable: true, type: typeof(ListGraphType<TicketType>)).Description("Tickets.");
        }
    }
}