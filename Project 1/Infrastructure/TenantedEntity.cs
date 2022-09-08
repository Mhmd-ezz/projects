using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Medcilia.Clinic.Infrastructure
{
    public class TenantedEntity : Entity
    {
        public DocumentRef TenantId { get; set; }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public Tenant Tenant { get; set; }
    }
}
