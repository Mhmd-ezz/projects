using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("MediaFiles")]
    public class MediaFile : TenantedEntity
    {
        public MediaFile()
        {
            CreatedOn = DateTime.Now;
            Tags = new DataPartition();
            SystemTagging = new List<FileSystemTagsEnum>();
        }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string PatientId { get; set; }
        public string PatientName { get; set; }
        public string Speciality { get; set; }
        public string ConditionId { get; set; }
        public string ActivityType { get; set; }
        public string ActivityId { get; set; }
        public string TicketNumber { get; set; }
        public bool IsDeleted { get; set; }
        public DataPartition SystemTags { get; set; }

        [BsonElement("SystemTagging")]
        public List<string> SystemTaggingKey
        {
            get {
                var tags = SystemTagging.ConvertAll(c=>c.Key.ToString());
                return tags;
            }
            set
            {
                var result = new List<FileSystemTagsEnum>();
               foreach( var val in value)
                {
                    var status = (val == null || val == "Not Set") ? FileSystemTagsEnum.NotSet : KeyedEnumeration.FromKey<FileSystemTagsEnum>(val);
                    if (status != null)
                        result.Add(status);
                }
                SystemTagging = result;

            }
        }

        [BsonIgnore]
        public List<FileSystemTagsEnum> SystemTagging { get; set; }

        public DataPartition Tags { get; set; }


        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? DeletedOn { get; set; }

    }
}
