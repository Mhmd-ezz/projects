using Medcilia.Clinic.WebApi.Enum;
using System;


namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class TicketEvent
    {
        public EventFrom From { get; set; }
        public TicketModel Content { get; set; }
        public string? Sub { get; set; }
        public string tenantId { get; set; }
        public DateTime SentAt { get; set; }
        public bool isTenant { get; set; }
        public string Event { get; set; }
    }
}
