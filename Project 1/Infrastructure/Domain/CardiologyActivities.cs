using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class CardiologyActivities
    {
        public CardiologyActivities()
        {
            Followups = new List<CardiologyFollowup>();
            Operations = new List<CardiologyOperation>();
        }
        public List<CardiologyFollowup> Followups { get; set; }
        public List<CardiologyOperation> Operations { get; set; }
    }
}
