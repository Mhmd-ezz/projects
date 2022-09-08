using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class PageResultTicketModel
    {
        public long Count { get; set; }
        public ICollection<TicketModel> Items { get; set; }
    }
}
