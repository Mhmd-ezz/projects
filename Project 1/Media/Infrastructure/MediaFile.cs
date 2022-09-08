using Medcilia.Clinic.Common.Enumerations;
using Media.Enums;
using Media.Helpers;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Media.Infrastructure
{
    public class MediaFile
    {
        public MediaFile()
        {
            CreatedOn = DateTime.Now;
            Modified = DateTime.Now;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public DocumentRef TenantId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string PatientId { get; set; }

        public string PatientName { get; set; }

        public string Speciality { get; set; }

        public string ConditionId { get; set; }
        public string ActivityType { get; set; }
        public string ActivityId { get; set; }
        public DataPartition SystemTags { get; set; }
        public DataPartition Tags { get; set; }

        [BsonElement("SystemTagging")]
        public string[] SystemTaggingKey
        {
            get
            {
                var tags = SystemTagging.ConvertAll(c => c.Key.ToString()).ToArray();
                return tags;
            }
            set
            {
                var result = new List<FileSystemTagsEnum>();
                foreach (var val in value)
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

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; }

    }
}