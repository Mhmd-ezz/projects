using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Media.Infrastructure
{
    public class MediaPartition
    {

        public MediaPartition()
        {
            CreatedOn = DateTime.Now;
        }

        public string Text { get; set; }
        public List<string> Tags { get; set; }

        public DateTime? Date { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }

    }

}