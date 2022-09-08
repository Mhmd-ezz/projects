using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class RecurrenceModel
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Rule { get; set; }
    }
}
