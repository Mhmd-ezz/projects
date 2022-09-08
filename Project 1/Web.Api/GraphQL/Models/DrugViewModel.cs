using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class DrugViewModel
    {
        public string Id { get; set; }
        //public string AtcCode { get; set; }
        public string Name { get; set; }
       public string Dosage { get; set; }
        //public string Presentation { get; set; }
        //public string Form { get; set; }
        //public string Route { get; set; }
    }
}
