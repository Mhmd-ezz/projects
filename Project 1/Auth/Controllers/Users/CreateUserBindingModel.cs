using System.ComponentModel.DataAnnotations;

namespace Auth.Controllers.Users
{
    public class CreateUserBindingModel
    {
        [Required]
        //[Display(Name = "البريد الإلكتروني")]
        //[EmailAddress]
        public string Email { get; set; }

        [Required]
        //[Display(Name = "إسم المستخدم")]
        public string Username { get; set; }

        [Required]
        //[Display(Name = "الإسم الأول")]
        public string FirstName { get; set; }

        [Required]
        //[Display(Name = "الشهرة")]
        public string LastName { get; set; }

        [Required]
        //[Display(Name = "كلمة المرور")]
        //[StringLength(100, ErrorMessage = "على {0} أن تكون على الأقل {2} حروف", MinimumLength = 1)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        //[Display(Name = "تأكيد كلمة المرور")]
        [DataType(DataType.Password)]
        //[Compare("Password", ErrorMessage = "لا تطابق بين كلمة المرور تأكيدها.")]
        public string ConfirmPassword { get; set; }

        public string TenantId { get; set; }
        public string Id { get; set; }
        public bool IsEnabled { get; set; }
        public string PhoneNumber { get; set; }
    }

}
