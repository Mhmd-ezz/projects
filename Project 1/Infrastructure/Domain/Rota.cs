using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Rota")]
    public class Rota : TenantedEntity
    {
        public Rota()
        {
            CreatedOn = DateTime.Now;
        }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        public string Name { get; set; }
        public string Color { get; set; }
        public MongoDBRef Location { get; set; }
        public List<Recurrence> Recurrence { get; set; }

        public bool IsDeleted { get; set; }

    }
}
