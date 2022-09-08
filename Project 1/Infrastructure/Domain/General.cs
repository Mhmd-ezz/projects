using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class General
    {
        // @ REMARK ADDED FOR ETL PURPOSE
        public General()
        {
            Conditions = new List<GeneralCondition>();
            MedicalHistory = new GeneralMedicalHistory();
        }
        public List<GeneralCondition> Conditions { get; set; }
        public GeneralMedicalHistory MedicalHistory { get; set; }
    }
}
