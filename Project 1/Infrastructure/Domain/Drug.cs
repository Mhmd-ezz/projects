using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Infrastructure.Helper;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Drugs")]
    public class Drug : TenantedEntity
    {
        public Drug()
        {
            CreatedOn = DateTime.Now;
        }

        //// @ Structure and principles
        //// @ https://www.whocc.no/
        public string AtcCode { get; set; }

        public string Name { get; set; }

        //// @ example 20mg or 20mg/10ml
        public string Dosage { get; set; }

        //// @ example : in case of tablets box may contain 60 tabs
        //public string Presentation { get; set; }

        //// @ Capsule, tabs, Injectable solution
        public string Form { get; set; }

        //// @ Oral, Ophtalmic,Rectal for suppo
        public string Route { get; set; }
        //public string Agent { get; set; }
        //public string Laboratory { get; set; }
        //public string Country { get; set; }
        //public string Price { get; set; }
        
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

    }
}
