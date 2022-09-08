using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Appointments")]
    public class Appointment : TenantedEntity
    {
        public Appointment()
        {
            CreatedOn = DateTime.Now;
        }

        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Reason { get; set; }
        public string Color { get; set; }
        public string Note { get; set; }
        public string ConditionId { get; set; }
        public string Speciality { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceId { get; set; }
        public string RecurrenceException { get; set; }
        public MongoDBRef Contact { get; set; }
        public MongoDBRef Location { get; set; }
        public bool IsBlock { get; set; }
        public bool IsReadonly { get; set; }
        public bool IsAllDay { get; set; }


        [Obsolete("Property Status should be used instead.")]
        [Browsable(false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        [BsonElement("Status")]
        public string StatusKey
        {
            get { return Status?.Key; }
            set
            {
                var status = (value == null || value == "Not Set") ? AppointmentStatusEnum.NotSet : KeyedEnumeration.FromKey<AppointmentStatusEnum>(value);
                if (status != null)
                    Status = status;
            }
        }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public AppointmentStatusEnum Status { get; set; }

        [Obsolete("Property Type should be used instead.")]
        [Browsable(false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        [BsonElement("Type")]
        public string TypeKey
        {
            get { return Type?.Key; }
            set
            {
                var type = (value == null || value == "Not Set") ? AppointmentTypeEnum.NotSet : KeyedEnumeration.FromKey<AppointmentTypeEnum>(value);
                if (type != null)
                    Type = type;
            }
        }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public AppointmentTypeEnum Type { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? DeletedOn { get; set; }

    }
}
