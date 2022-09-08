using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Tickets")]
    public class Ticket : TenantedEntity
    {
        public Ticket()
        {
            CreatedOn = DateTime.Now;
            Messages = new List<TicketMessages>();
        }

        public string TicketNumber { get; set; }
        public string Subject { get; set; }        
        public string Details { get; set; }
        public int Status { get; set; }
        public Boolean AttachFile { get; set; }
        public Boolean IsReadbyAdmin { get; set; }
        public Boolean IsReadbyClient { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        public List<TicketMessages> Messages { get; set; }
    }
}
