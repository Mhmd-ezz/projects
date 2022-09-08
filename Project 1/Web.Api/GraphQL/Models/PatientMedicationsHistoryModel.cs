using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class PatientMedicationsHistoryModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Duration { get; set; }
        public string Frequency { get; set; }
        public string note { get; set; }

        public string Status { get; set; }
    }
}
