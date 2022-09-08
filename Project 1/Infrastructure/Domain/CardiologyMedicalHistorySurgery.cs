using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class CardiologyMedicalHistorySurgery
    {
        public CardiologyMedicalHistorySurgery()
        {
            Data = new List<CardiologySurgicalHistory>();
        }

        public bool Alert { get; set; }
        public DateTime? LastUpdate { get; set; }
        public List<CardiologySurgicalHistory> Data { get; set; }
    }
}
