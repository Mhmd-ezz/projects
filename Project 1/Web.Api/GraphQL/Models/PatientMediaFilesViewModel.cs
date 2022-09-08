using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class PatientMediaFilesViewModel
    {
        public string Id { get; set; }
        public string PatientName { get; set; }
        public int ImagesCount { get; set; }
        public int PdfCount { get; set; }
        public List<MediaFileModel> Pool { get; set; }
        public List<MediaFileModel> Files { get; set; }

    }
}
