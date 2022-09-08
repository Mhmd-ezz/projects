using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class GeneralModel
    {
        public List<GeneralConditionModel> Conditions { get; set; }
        public GeneralMedicalHistoryModel MedicalHistory { get; set; }
    }
}
