using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class DataPartitionModel
    {
        public LookupViewModel[] Text { get; set; }
        public MediaPartitionModel[] Media { get; set; }
        public string[] Tags { get; set; }
    }
}