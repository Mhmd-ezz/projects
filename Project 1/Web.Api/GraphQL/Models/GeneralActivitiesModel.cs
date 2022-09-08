using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class GeneralActivitiesModel
    {
        public List<GeneralFollowupModel> Followups { get; set; }
        public List<GeneralOperationModel> Operations { get; set; }
    }
}
