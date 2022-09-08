using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class TicketModel
    {
        public string Id { get; set; }
        public string TicketNumber { get; set; }
        public string tenantName { get; set; }
        public string Subject { get; set; }
        public string Details { get; set; }
        public int Status { get; set; }
        public bool IsReadByAdmin { get; set; }
        public bool IsReadByClient{ get; set; }
        public bool AttachFile { get; set; }
        public List<TicketMessagesModel> Messages { get; set; }
        public DateTime? TicketDate { get; set; }
    }
}
