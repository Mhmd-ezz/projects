using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class MediaRootModel
    {
        public MediaRootModel()
        {
            Files = new List<MediaFileModel>();
        }
        public List<MediaFileModel> Files { get; set; }
    }
}
