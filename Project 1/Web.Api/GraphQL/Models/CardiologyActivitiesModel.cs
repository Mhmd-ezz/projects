using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class CardiologyActivitiesModel
    {
        public List<CardiologyFollowupModel> Followups { get; set; }
        public List<CardiologyOperationModel> Operations { get; set; }
    }
}
