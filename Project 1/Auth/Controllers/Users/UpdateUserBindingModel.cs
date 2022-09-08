using System.ComponentModel.DataAnnotations;

namespace Auth.Controllers.Users
{
    public class UpdateUserBindingModel
    {
        [Required]
        public string Id { get; set; }

        [Required]        
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsEnabled { get; set; }
    }
}
