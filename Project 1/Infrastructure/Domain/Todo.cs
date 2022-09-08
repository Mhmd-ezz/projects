using Medcilia.Clinic.Infrastructure.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    [CollectionName("Todos")]
    public class Todo : TenantedEntity
    {
        public Todo()
        {
            CreatedOn = DateTime.Now;
        }

        public string Title { get; set; }
        public string Notes { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsStarred { get; set; }
        public bool IsImportant { get; set; }
        public string PatientId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
