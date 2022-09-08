using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class SurgicalHistory
    {
        public string What { get; set; }
        public DateTime? When { get; set; }
        public string Note { get; set; }
    }
}
