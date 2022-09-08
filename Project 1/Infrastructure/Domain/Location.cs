using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Medcilia.Clinic.Infrastructure.Helper;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Locations")]
    public class Location : TenantedEntity
    {
        public Location()
        {
            CreatedOn = DateTime.Now;
        }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        public string Name { get; set; }
        public string Contact { get; set; }
        public string Type { get; set; }
        public string Address { get; set; }
        public List<string> SubLocations { get; set; }

    }
}
