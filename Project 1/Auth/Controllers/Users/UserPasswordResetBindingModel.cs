using System.ComponentModel.DataAnnotations;

namespace Auth.Controllers.Users
{
    public class UserPasswordResetBindingModel
    {
        [Required]
        public string Id { get; set; }

        public bool IsEnabled { get; set; }
    }
}
