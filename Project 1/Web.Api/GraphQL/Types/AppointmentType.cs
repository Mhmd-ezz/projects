using System.Collections.Generic;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Appointment;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class AppointmentType : ObjectGraphType<AppointmentModel>
    {
        public AppointmentType(IAppointmentRepository appointmentRepository, IMapper mapper)
        {
            Name = "Appointment";

            Field(h => h.Id, nullable: true).Description("The id of the appointment.");
            Field(h => h.Subject, nullable: true).Description("The title of appointment.");
            Field(h => h.StartTime, nullable: true, type: typeof(DateTimeGraphType)).Description("The start time of appointment.");
            Field(h => h.EndTime, nullable: true, type: typeof(DateTimeGraphType)).Description("The end time of appointment.");
            Field(h => h.Reason, nullable: true).Description("The reason of appointment.");
            Field(h => h.Color, nullable: true).Description("The color of appointment.  Ex: '#fff' ");
            Field(h => h.Note, nullable: true).Description("Any related notes.");
            Field(h => h.ConditionId, nullable: true).Description("");
            Field(h => h.Speciality, nullable: true).Description("");
            Field(h => h.RecurrenceId, nullable: true).Description("");
            Field(h => h.RecurrenceException, nullable: true).Description("");
            Field(h => h.RecurrenceRule, nullable: true).Description("");
            Field(h => h.IsBlock, nullable: true).Description("If reservations are blocked due to time range.");
            Field(h => h.IsReadonly, nullable: true).Description("Is appointment readonly?");
            Field(h => h.IsAllDay, nullable: true).Description("If appointment is all day event.");
            Field(h => h.Type, nullable: true).Description("The type of appointment.");
            Field(h => h.Status, nullable: true).Description("The status of appointment.");
            Field(h => h.Location, nullable: true, type: typeof(LocationViewType)).Description("The location associated with the appointment.");
            Field(h => h.Contact, nullable: true, type: typeof(ContactType)).Description("The contact associated with the appointment.");
        }
    }
}
