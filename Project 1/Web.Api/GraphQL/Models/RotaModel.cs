using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class RotaModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }

        public LocationViewModel Location { get; set; }
        public List<RecurrenceModel> Recurrence { get; set; }

    }
}
