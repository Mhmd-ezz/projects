using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class MedicalHistoryMedicationModel
    {
        public bool Alert { get; set; }
        public DateTime? LastUpdate { get; set; }
        public MedicationModel[] Data { get; set; }
    }
}
