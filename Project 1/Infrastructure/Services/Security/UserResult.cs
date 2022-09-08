using System.Collections.Generic;

namespace Medcilia.Clinic.Infrastructure.Services.Security
{
    public class UserResult
    {
        public bool Succeeded { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public string UserId { get; set; }
    }
}
