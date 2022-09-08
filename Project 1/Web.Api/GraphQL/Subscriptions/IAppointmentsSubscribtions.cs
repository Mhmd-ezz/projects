using Medcilia.Clinic.WebApi.Enum;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Reactive.Linq;
using System.Reactive.Subjects;

namespace Medcilia.Clinic.WebApi.GraphQL.Subscriptions
{
    public interface IAppointmentsSubscribtions
    {
        ConcurrentStack<AppointmentEvent> AllAppointments { get; }

        // @ Events
        AppointmentEvent AppointmentChanges(AppointmentModel message, string eventType, string tenantId, string userId, string userFullName );

        // @ Observables
        IObservable<AppointmentEvent> AppointmentsEvents();

    }
    public class AppointmentsSubscribtions : IAppointmentsSubscribtions
    {
        private readonly ISubject<AppointmentEvent> _appointmentStream = new Subject<AppointmentEvent>();
        public ConcurrentStack<AppointmentEvent> AllAppointments { get; }

        public AppointmentsSubscribtions()
        {
            AllAppointments = new ConcurrentStack<AppointmentEvent>();

        }

        public IObservable<AppointmentEvent> AppointmentsEvents()
        {
            return _appointmentStream
                .Select(message =>
                {
                    message.Content = message.Content;
                    return message;
                })
                .AsObservable();
        }
        public AppointmentEvent AppointmentChanges(AppointmentModel message, string eventType, string tenanId, string userId, string userFullName)
        {
            var model = new AppointmentEvent
            {
                Event = eventType,
                Content = message,
                SentAt = DateTime.Now,
                tenantId = tenanId,
                From = new EventFrom { Id = userId, DisplayName = userFullName }
            };
            AllAppointments.Push(model);
            _appointmentStream.OnNext(model);
            return model;
        }



        public void AddError(Exception exception) => _appointmentStream.OnError(exception);
    }
}
