using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class MedicationModel
    {
        public DrugViewModel Drug { get; set; }
        public string Note { get; set; }
        public bool? NoSubstitutes { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Frequency { get; set; }

        // @ single dose/continuous/when needed
        public string UsageType { get; set; }

        // todo : get user name by id
        public string DescribedBy { get; set; }
    }
}