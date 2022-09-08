using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    // [CollectionName("Patients")]
    public class Patient // : TenantedEntity
    {
        public Patient()
        {
            CreatedOn = DateTime.Now;
            Grantors = new List<MongoDBRef>();
            Tags = new List<MongoDBRef>();
            Referral = new List<string>();
            Flags = new List<string>();
        }

        //public string Name { get; set; }
        //public string Telephone { get; set; }
        //public string Gender { get; set; }
        //public DateTime BirthDate { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? EntryDate { get; set; }
        //public string Occupation { get; set; }
        //public string Partner { get; set; }
        //public string Country { get; set; }
        //public string City { get; set; }
        //public string Email { get; set; }
        public List<string> Referral { get; set; }
        public string EmergancyContact { get; set; }
        public string FileNumber { get; set; }
        public string IdentityNumber { get; set; }
        public IList<MongoDBRef> Grantors { get; set; }
        public IList<MongoDBRef> Todos { get; set; }
        public IList<MongoDBRef> Tags { get; set; }
        //public List<MongoDBRef> Media { get; set; }
        public MediaRoot MediaFiles { get; set; }
        public List<string> Flags { get; set; }
        public int TotalDigitizedData { get; set; }
        public DateTime? LastSeen { get; set; }

        public Speciality Specialities { get; set; }

        [Obsolete("Property MaritalStatus should be used instead.")]
        [Browsable(false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        [BsonElement("MaritalStatus")]
        public string MaritalStatusKey
        {
            get { return MaritalStatus?.Key; }
            set
            {
                var status = (value == null || value == "Not Set") ? MaritalStatusEnum.NotSet : KeyedEnumeration.FromKey<MaritalStatusEnum>(value);
                if (status != null)
                    MaritalStatus = status;
            }
        }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public MaritalStatusEnum MaritalStatus { get; set; }

        [Obsolete("Property BloodType should be used instead.")]
        [Browsable(false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        [BsonElement("BloodType")]
        public string BloodTypeKey
        {
            get { return BloodType?.Key; }
            set
            {
                var bloodType = (value == null || value == "Not Set") ? BloodTypeEnum.NotSet : KeyedEnumeration.FromKey<BloodTypeEnum>(value);
                if (bloodType != null)
                    BloodType = bloodType;
            }
        }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public BloodTypeEnum BloodType { get; set; }       

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }

}
