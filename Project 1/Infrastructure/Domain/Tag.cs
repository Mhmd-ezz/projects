using Medcilia.Clinic.Infrastructure.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Tags")]
    public class Tag : TenantedEntity
    {
        public Tag()
        {
            CreatedOn = DateTime.Now;
        }

        public string Name { get; set; }
        public string Group { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}

