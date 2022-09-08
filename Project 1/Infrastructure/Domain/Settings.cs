using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Settings")]
    public class Settings : Entity
    {
        public Settings()
        {
            CreatedOn = DateTime.Now;
        }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        //TODO : List of specialities ENUM
        public ICollection<string> Specialties { get; set; }

    }
}
