using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class MedicalHistoryMedication
    {
        public MedicalHistoryMedication()
        {
            Data = new List<Medication>();
        }

        public bool Alert { get; set; }
        public DateTime? LastUpdate { get; set; }
        public List<Medication> Data { get; set; }
    }
}
