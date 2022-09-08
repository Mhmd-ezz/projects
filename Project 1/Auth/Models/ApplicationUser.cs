using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Auth.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime JoinDate { get; set; }

        public bool IsEnabled { get; set; }

        public string TenantId { get; set; }
        //public bool IsAdmin { get; set; }
        //public string DataEventRecordsRole { get; set; }
        //public string SecuredFilesRole { get; set; }
    }
}