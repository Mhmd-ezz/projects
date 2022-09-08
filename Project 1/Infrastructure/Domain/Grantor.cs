using Medcilia.Clinic.Infrastructure.Helper;
using System;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Grantors")]
    public class Grantor : TenantedEntity
    {
        public Grantor()
        {
            CreatedOn = DateTime.Now;
        }

        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
