using System.Collections.Generic;

namespace Medcilia.Clinic.Infrastructure.Services
{
    public class PagedData<T> where T : class
    {
        public long Total { get; set; }
        public IEnumerable<T> Items { get; set; }

        public dynamic Bag { get; set; }
    }
}
