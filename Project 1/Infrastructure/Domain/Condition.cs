using System;
using System.Collections.Generic;
using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Condition 
    {
        public Condition()
        {
            CreatedOn = DateTime.Now;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? Opened { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? Closed { get; set; }
        //public DateTime Date { get; set; }
        //public string Location { get; set; }
        public MongoDBRef Location { get; set; }
        public string SubLocation { get; set; }
        //public IList<MediaPartition> Media { get; set; }
        public List<MongoDBRef> Media { get; set; }
        public MediaRoot MediaFiles { get; set; }
        public bool IsDuplicate { get; set; }
        public bool IsHidden { get; set; }

        [BsonElement("Type")]
        public string TypeKey
        {
            get { return Type?.Key; }
            private set
            {
                var type = (value == null || value == "Not Set") ? ConditionTypeEnum.NotSet : KeyedEnumeration.FromKey<ConditionTypeEnum>(value);
                if (type != null)
                    Type = type;
            }
        }
        [BsonIgnore]
        public ConditionTypeEnum Type { get; set; }


        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        
    }
}
