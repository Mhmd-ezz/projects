using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class GeneralActivities
    {
        public GeneralActivities()
        {
            Followups = new List<GeneralFollowup>();
            Operations = new List<GeneralOperation>();
        }
        public List<GeneralFollowup> Followups { get; set; }
        public List<GeneralOperation> Operations { get; set; }
    }
}
