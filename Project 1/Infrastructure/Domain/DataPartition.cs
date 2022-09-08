using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class DataPartition
    {
        public DataPartition()
        {
            Text = new List<MongoDBRef>();
            Media = new List<MediaPartition>();
            Tags = new List<string>();
        }

        public List<MongoDBRef> Text { get; set; }
        public List<MediaPartition> Media { get; set; }
        public List<string> Tags { get; set; }
    }
}
