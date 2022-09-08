using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class CardiologySurgicalHistoryModel
    {
        public string Type { get; set; }
        public LookupViewModel[] What { get; set; }
        public DateTime? When { get; set; }
        public string Note { get; set; }
    }
}
