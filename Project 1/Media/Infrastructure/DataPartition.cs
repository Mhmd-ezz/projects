using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Media.Infrastructure
{
    public class DataPartition
    {
        public IList<MongoDBRef> Text { get; set; }
        public List<MediaPartition> Media { get; set; }
        public List<string> Tags { get; set; }
    }
}