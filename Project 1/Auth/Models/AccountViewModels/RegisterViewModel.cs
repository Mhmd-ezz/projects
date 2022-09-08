using System.ComponentModel.DataAnnotations;

namespace Auth.Models.AccountViewModels
{
    public class RegisterViewModel
    {

        [Required(ErrorMessage = "FIRSTNAME_REQUIRED")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "LASTNAME_REQUIRED")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "EMAIL_REQUIRED")]
        [EmailAddress(ErrorMessage = "EMAIL_INVALID")]
        public string Email { get; set; }

        [Required(ErrorMessage = "PASSWORD_REQUIRED")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "CONFIRM_PASSWORD_NOT_MATCHING")]
        public string ConfirmPassword { get; set; }
    }
}
