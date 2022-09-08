using System;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class SubscriptionModel
    {
        public string Id { get; set; }
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
