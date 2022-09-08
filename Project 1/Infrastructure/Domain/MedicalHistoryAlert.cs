using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class MedicalHistoryAlert
    {
        public MedicalHistoryAlert()
        {
            Data = new List<MongoDBRef>();
        }
        public bool Alert { get; set; }
        public DateTime? LastUpdate { get; set; }
        public List<MongoDBRef> Data { get; set; }
    }
}
