using Medcilia.Clinic.WebApi.Enum;
using System;


namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class AppointmentEvent
    {
        public EventFrom From { get; set; }
        public AppointmentModel Content { get; set; }
        public string? Sub { get; set; }
        public string tenantId { get; set; }
        public DateTime SentAt { get; set; }

        public string Event { get; set; }
    }
}
