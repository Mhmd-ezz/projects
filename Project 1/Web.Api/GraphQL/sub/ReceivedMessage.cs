using System;

namespace Medcilia.Clinic.WebApi.GraphQL.sub
{
    public class ReceivedMessage
    {
        public string FromId { get; set; }

        public string Content { get; set; }

        public DateTime SentAt { get; set; }
    }
}
