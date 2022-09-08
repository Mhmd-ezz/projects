using Medcilia.Clinic.Infrastructure.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Services
{
    public class PatientMediaFiles
    {
        public string Id { get; set; }
        public string PatientName { get; set; }

        public int ImagesCount
        {
            get { return Images == null ? 0 : Images.Count(); }
        }

        public int PdfCount
        {
            get { return Pdfs == null ? 0 : Pdfs.Count(); }

        }
        public IEnumerable<MediaFile> Pool { get; set; }
        public IEnumerable<MediaFile> Files { get; set; }
        public IEnumerable<MediaFile> Pdfs { get; internal set; }
        public IEnumerable<MediaFile> Images { get; internal set; }
    }
}
