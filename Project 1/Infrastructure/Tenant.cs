using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    /// <summary>
    /// A tenant is a an account owner
    /// </summary>
    [CollectionName("Tenants")]
    public class Tenant : Entity
    {
        public Tenant()
        {
        }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
        
        public string Name { get; set; }

        public string ContactName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        [BsonElement("Speciality")]
        public string SpecialityKey
        {
            get { return Speciality?.Key; }
            private set
            {
                var status = (value == null || value == "Not Set") ?
                    SpecialityEnum.NotSet :
                    KeyedEnumeration.FromKey<SpecialityEnum>(value);
                if (status != null)
                    Speciality = status;
            }
        }
        [NotMapped, JsonIgnore, BsonIgnore]
        public SpecialityEnum Speciality { get; set; }


        [BsonElement("Subscription")]
        public string SubscriptionKey
        {
            get { return Subscription?.Key; }
            private set
            {
                var status = (value == null || value == "Not Set") ? 
                    SubscriptionStatusEnum.NotSet : 
                    KeyedEnumeration.FromKey<SubscriptionStatusEnum>(value);
                if (status != null)
                    Subscription = status;
            }
        }
        [NotMapped, JsonIgnore, BsonIgnore]
        public SubscriptionStatusEnum Subscription { get; set; }
        

    }
}
