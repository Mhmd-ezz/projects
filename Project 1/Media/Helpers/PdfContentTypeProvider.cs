using Microsoft.Owin.StaticFiles.ContentTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Media.Helpers
{
    public class PdfContentTypeProvider : FileExtensionContentTypeProvider
    {
        public PdfContentTypeProvider()
        {
            if (!Mappings.ContainsKey(".pdf"))
                Mappings.Add(".pdf", "application/pdf");
        }
    }
}