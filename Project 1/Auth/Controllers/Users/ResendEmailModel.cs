using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.Users
{
    public class ResendEmailModel
    {
        [Required]
        public string Id { get; set; }

    }
}
