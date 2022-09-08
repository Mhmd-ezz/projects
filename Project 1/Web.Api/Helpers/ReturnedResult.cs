using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Helpers
{
    public class ReturnedResult<T> where T : class
    {
        public T[] Items { get; set; }
        public long Total { get; set; }
    }
}
