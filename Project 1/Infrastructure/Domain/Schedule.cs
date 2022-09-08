using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Schedule")]
    public class Schedule : TenantedEntity
    {

        public Schedule()
        {
            CreatedOn = DateTime.Now;
            StartHour = "00:00";
            EndHour = "24:00";
        }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        public string StartHour { get; set; }
        public string EndHour { get; set; }
        public bool DisplayRota { get; set; }

    }
}
