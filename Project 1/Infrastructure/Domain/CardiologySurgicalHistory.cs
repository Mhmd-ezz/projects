using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class CardiologySurgicalHistory
    {
        public CardiologySurgicalHistory()
        {
            What = new List<MongoDBRef>();
        }
        public string Type { get; set; }
        public List<MongoDBRef> What { get; set; }
        public DateTime? When { get; set; }
        public string Note { get; set; }
    }
}
