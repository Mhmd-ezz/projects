using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.sub
{
    public class Message
    {
        public MessageFrom From { get; set; }

        public string? Sub { get; set; }

        public string Content { get; set; }
        public string tenantId { get; set; }

        public DateTime SentAt { get; set; }
    }

    public class AppointmentEvent_
    {
        public MessageFrom From { get; set; }
        public AppointmentModel Content { get; set; }
        public string? Sub { get; set; }
        public string tenantId { get; set; }
        public DateTime SentAt { get; set; }
    }

    public  class Event
    {
        public MessageFrom From { get; set; }
        public string  Content { get; set; }
        public string? Sub { get; set; }
        public string tenantId { get; set; }
        public DateTime SentAt { get; set; }
    }

    public class Event<T> 
    {
        public MessageFrom From { get; set; }
        public T Content { get; set; }
        public string? Sub { get; set; }
        public string tenantId { get; set; }
        public DateTime SentAt { get; set; }

    }

}
