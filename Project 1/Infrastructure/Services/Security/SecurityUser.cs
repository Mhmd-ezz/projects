using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Medcilia.Clinic.Infrastructure.Services.Security
{
    public class SecurityUser
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public DateTime JoinDate { get; set; }
        public IList<string> Roles { get; set; }
        public IList<Claim> Claims { get; set; }
        public bool IsLocked { get; set; }
        public bool IsEnabled { get; set; }
    }
}
