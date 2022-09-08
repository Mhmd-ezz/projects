﻿using System.ComponentModel.DataAnnotations;

namespace Auth.Models.AccountViewModels
{
    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }
        [Required(ErrorMessage = "CODE_REQUIRED")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberBrowser { get; set; }
        public bool RememberMe { get; set; }
    }
}
