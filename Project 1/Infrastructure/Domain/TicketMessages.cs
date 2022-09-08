using Medcilia.Clinic.Infrastructure.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class TicketMessages
    {
        public string Message { get; set; }
        public string RequestBy { get; set; }
        public DateTime MessageDate { get; set; }
    }
}
