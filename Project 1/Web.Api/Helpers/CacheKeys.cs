using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Helpers
{
    public static class CacheKeys
    {
        public static string Lookup { get { return "_Lookup"; } }
        public static string Location { get { return "_Location"; } }
        public static string Grantor { get { return "_Grantor"; } }
        public static string Tag { get { return "_Tag"; } }
        public static string Drug { get { return "_Drug"; } }
        public static string Contact { get { return "_Contact"; } }
        public static string MediaFile { get { return "_MediaFile"; } }
        public static string Rota { get { return "_Rota"; } }
        public static string Todo { get { return "_Todo"; } }
        public static string Ticket { get { return "_Ticket"; } }
    }
}
