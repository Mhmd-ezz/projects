using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Contacts")]
    public class Contact : TenantedEntity
    {
        public Contact()
        {
            CreatedOn = DateTime.Now;
            ContactNumbers = new List<string>();
        }

        public string Name { get; set; }
        public string Telephone { get; set; }
        public string Gender { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime BirthDate { get; set; }
        public string Occupation { get; set; }
        public string Partner { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public List<string> ContactNumbers { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
        public bool IsDuplicate { get; set; }


        [Obsolete("Property ContactType should be used instead.")]
        [Browsable(false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        [BsonElement("ContactType")]
        public string ContactTypeKey
        {
            get { return ContactType?.Key; }
            set
            {
                var contactType = (value == null || value == "Contant") ? ContactTypeEnum.Contact : KeyedEnumeration.FromKey<ContactTypeEnum>(value);
                if (contactType != null)
                    ContactType = contactType;
            }
        }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public ContactTypeEnum ContactType { get; set; }

        public Patient PatientInfo { get; set; }
    }
}
