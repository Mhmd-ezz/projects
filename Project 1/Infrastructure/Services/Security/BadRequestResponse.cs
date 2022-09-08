using System.Collections.Generic;

namespace Medcilia.Clinic.Infrastructure.Services.Security
{
    public class BadRequestResponse
    {
        public string Message { get; set; }
        public Dictionary<string, string[]> ModelState { get; set; }
    }
}
