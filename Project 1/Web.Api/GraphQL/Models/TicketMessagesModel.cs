using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class TicketMessagesModel
    {
        public string Message { get; set; }
        public string RequestBy { get; set; }
        public DateTime? MessageDate { get; set; }

    }
}
