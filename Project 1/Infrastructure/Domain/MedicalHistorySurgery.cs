using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class MedicalHistorySurgery
    {
        public MedicalHistorySurgery()
        {
            Data = new List<SurgicalHistory>();
        }

        public bool Alert { get; set; }
        public DateTime? LastUpdate { get; set; }
        public List<SurgicalHistory> Data { get; set; }
    }
}
