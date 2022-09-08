using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class CardiologyModel
    {
        public List<CardiologyConditionModel> Conditions { get; set; }
        public CardiologyMedicalHistoryModel MedicalHistory { get; set; }
    }
}
