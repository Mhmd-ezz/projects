using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class MediaRoot
    {
        public List<MongoDBRef> Files { get; set; }
    }
}
