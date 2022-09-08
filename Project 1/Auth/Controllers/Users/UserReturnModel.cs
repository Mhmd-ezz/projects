using System;
using System.Collections.Generic;

namespace Auth.Controllers.Users
{
    public class UserReturnModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public DateTime JoinDate { get; set; }
        public IList<string> Roles { get; set; }
        public IList<System.Security.Claims.Claim> Claims { get; set; }
        public bool IsLocked { get; set; }
        public bool IsEnabled { get; set; }
        public string TenantId { get; set; }
    }
}
