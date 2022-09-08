using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Cardiology
    {
        // @ REMARK ADDED FOR ETL PURPOSE
        public Cardiology()
        {
            Conditions = new List<CardiologyCondition>();
            MedicalHistory = new CardiologyMedicalHistory();
        }
        public List<CardiologyCondition> Conditions { get; set; }
        public CardiologyMedicalHistory MedicalHistory { get; set; }
    }
}
