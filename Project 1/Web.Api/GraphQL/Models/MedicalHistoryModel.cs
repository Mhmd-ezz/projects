using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class MedicalHistoryModel
    {
        public bool Alert { get; set; }
        public string Type{ get; set; }
        public DateTime? LastUpdate { get; set; }
    }
}
