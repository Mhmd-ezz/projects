using System;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Medication
    {
        public Medication()
        {
            CreatedOn = DateTime.Now;
            
        }
        public MongoDBRef Drug { get; set; }

        public string Note { get; set; }
        public bool? NoSubstitutes { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? StartDate { get; set; }
        public string DescribedBy { get; set; }
        public DateTime? EndDate { get; set; }

        // @ single dose/continuous/when needed
        public string UsageType { get; set; }

        // @ usage
        public string Frequency { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }


        // @ foreign system uses quantity of drug in refill, equivalent to presentation 
        //public int DrugQuantity { get; set; }

        // @ foreign system uses number of refills 
        //public int Refills { get; set; }


    }
}
