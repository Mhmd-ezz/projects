using Medcilia.Clinic.Common.Dates;
using System;
using System.ComponentModel.DataAnnotations;

namespace Medcilia.Clinic.Infrastructure.Services
{
    public class ActivityLog : TenantedEntity
    {
        public ActivityLog()
        {
            this.CreatedDate = DomainTime.Now();
            this.ModifiedDate = DomainTime.Now();
        }

        //public Guid Id { get; set; }
        [StringLength(100)]
        public string Description { get; set; }
        public Guid UserId { get; set; }

        [StringLength(100)]
        public string UserName { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

}
