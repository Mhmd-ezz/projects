using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class SurgicalHistoryModel
    {
        public string What { get; set; }
        public DateTime? When { get; set; }
        public string Note { get; set; }
    }
}
