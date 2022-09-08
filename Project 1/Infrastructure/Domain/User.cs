using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Users")]
    public class User : TenantedEntity
    {
        public string UserId { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        public bool IsEnabled { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string[] Roles { get; set; }

        [NotMapped, JsonIgnore, BsonIgnore]
        public UserRolesEnum[] RolesEnums
        {
            get
            {
                return KeyedEnumeration.FromKey<UserRolesEnum>(Roles);
            }
            set
            {
                Roles = value.Select(x => x.Key).ToArray();
            }
        }

        public bool IsDeleted { get; internal set; }

        public string getFullName() {
            return FirstName + " " + LastName;
        }
    }
}
