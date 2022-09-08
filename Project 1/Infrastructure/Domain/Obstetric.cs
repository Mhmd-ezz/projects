using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Obstetric
    {
        public List<Condition> Conditions { get; set; }
        public List<MedicalHistory> MedicalHistory { get; set; }
    }
}
