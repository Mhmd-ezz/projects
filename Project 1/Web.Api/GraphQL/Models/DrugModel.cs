using System;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class DrugModel
    {
        public string Id { get; set; }
        public string AtcCode { get; set; }
        public string Name { get; set; }
        public string Dosage { get; set; }
        //public string Presentation { get; set; }
        public string Form { get; set; }
        public string Route { get; set; }
        //public string Agent { get; set; }
        //public string Laboratory { get; set; }
        //public string Country { get; set; }
        //public string Price { get; set; }
    }
}
