using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class ConditionModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string SubLocation { get; set; }
        public DateTime? Opened { get; set; }
        public DateTime? Closed { get; set; }
        //public DateTime Date { get; set; }
        public LocationViewModel Location { get; set; }
        //public string PatientId { get; set; }
        public string Statistics { get; set; }
        public bool IsDuplicate { get; set; }
        public bool IsHidden { get; set; }
        //public MediaPartitionModel[] Media { get; set; }
        //public List<MediaFileModel> Media { get; set; }
        //public MediaRootModel MediaFiles { get; set; }


    }
}
