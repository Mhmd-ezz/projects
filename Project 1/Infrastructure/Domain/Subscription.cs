using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Infrastructure.Helper;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Subscriptions")]
    public class Subscription : Entity
    {
        public Subscription()
        {
            CreatedOn = DateTime.Now;
        }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

        public DateTime? ProcessTime { get; set; }
        public DateTime? ExpireDate { get; set; }
        public string Edition { get; set; }
        public string PaymentMethod { get; set; }
        public string Amount { get; set; }
        public string DayCount { get; set; }
        public string GrossAmount { get; set; }
        public string Status { get; set; }


    }
}
