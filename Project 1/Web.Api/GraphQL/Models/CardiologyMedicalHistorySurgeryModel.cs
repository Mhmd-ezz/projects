using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class CardiologyMedicalHistorySurgeryModel
    {
        public bool Alert { get; set; }
        public DateTime? LastUpdate { get; set; }
        public CardiologySurgicalHistoryModel[] Data { get; set; }
    }
}
