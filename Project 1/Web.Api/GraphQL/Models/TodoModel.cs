using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class TodoModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Notes { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsStarred { get; set; }
        public bool IsImportant { get; set; }
        public string PatientId { get; set; }
    }
}
