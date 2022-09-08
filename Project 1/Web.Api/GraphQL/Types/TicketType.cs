using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class TicketType : ObjectGraphType<TicketModel>
    {
        public TicketType()
        {
            Name = "Ticket";

            Field(h => h.Id, nullable: true).Description("Id of the Ticket");
            Field(h => h.TicketNumber, nullable: true).Description("Ticket number of the Ticket");            
            Field(h => h.tenantName, nullable: true).Description("tenantName of the Ticket");
            Field(h => h.Subject, nullable: true).Description("Subject of the Ticket");
            Field(h => h.Details, nullable: true).Description("Details of the Ticket");
            Field(h => h.Status, nullable: true).Description("Status of the Ticket");
            Field(h => h.AttachFile, nullable: true).Description("Attached File of the Ticket");
            Field(h => h.IsReadByAdmin, nullable: true).Description("Admin read the ticket");
            Field(h => h.IsReadByClient, nullable: true).Description("Client read the ticket");
            Field(h => h.TicketDate, nullable: true).Description("date of replay message");
            Field(h => h.Messages, nullable: true, type: typeof(ListGraphType<TicketMessagesType>)).Description("");
        }
    }
}
