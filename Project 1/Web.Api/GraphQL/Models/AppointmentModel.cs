using System;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class AppointmentModel
    {
        public string Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Reason { get; set; }
        public string Color { get; set; }
        public string Note { get; set; }
        public string ConditionId { get; set; }
        public string Speciality { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceId { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsBlock { get; set; }
        public bool IsReadonly { get; set; }
        public bool IsAllDay { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public ContactModel Contact { get; set; }

        public LocationViewModel Location { get; set; }

        public DateTime? CreatedOn { get; set; }
        public DateTime? Modified { get; set; }

    }
}
