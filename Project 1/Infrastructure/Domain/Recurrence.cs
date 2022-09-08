using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Recurrence
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Rule { get; set; }

    }
}
