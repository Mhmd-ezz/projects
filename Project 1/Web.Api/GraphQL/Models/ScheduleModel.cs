using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class ScheduleModel
    {
        public string Id { get; set; }
        public string StartHour { get; set; }
        public string EndHour { get; set; }
        public bool DisplayRota { get; set; }

    }
}
