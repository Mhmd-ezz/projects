using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class MediaPartitionModel
    {

        public MediaPartitionModel()
        {
            CreatedOn = DateTime.Now;
        }

        public string Text { get; set; }
        public string[] Tags { get; set; }

        public DateTime? Date { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }

    }
}
