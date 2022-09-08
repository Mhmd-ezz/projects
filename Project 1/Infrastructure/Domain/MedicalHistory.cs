using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class MedicalHistory
    {
        public bool Alert { get; set; }
        public string Type{ get; set; }
        public DateTime? LastUpdate { get; set; }
    }
}
