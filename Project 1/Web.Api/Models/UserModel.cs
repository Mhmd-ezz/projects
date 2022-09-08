using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        public bool IsEnabled { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TenantId { get; set; }
        public string[] Roles { get; set; }

    }
}
