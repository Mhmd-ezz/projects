using Medcilia.Clinic.WebApi.Enum;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Reactive.Linq;
using System.Reactive.Subjects;

namespace Medcilia.Clinic.WebApi.GraphQL.Subscriptions
{
    public interface ITicketsSubscribtions
    {
        ConcurrentStack<TicketEvent> AllTickets { get; }

        // @ Events
        TicketEvent TicketChanges(TicketModel message, string eventType, string tenantId, string userId, string userFullName,bool isTenant );

        // @ Observables
        IObservable<TicketEvent> TicketsEvents();

    }
    public class TicketsSubscribtions : ITicketsSubscribtions
    {
        private readonly ISubject<TicketEvent> _ticketStream = new Subject<TicketEvent>();
        public ConcurrentStack<TicketEvent> AllTickets { get; }

        public TicketsSubscribtions()
        {
            AllTickets = new ConcurrentStack<TicketEvent>();

        }

        public IObservable<TicketEvent> TicketsEvents()
        {
            return _ticketStream
                .Select(message =>
                {
                    message.Content = message.Content;
                    return message;
                })
                .AsObservable();
        }
        public TicketEvent TicketChanges(TicketModel message, string eventType, string tenanId, string userId, string userFullName, bool isTenant)
        {
            var model = new TicketEvent
            {
                Event = eventType,
                Content = message,
                SentAt = DateTime.Now,
                tenantId = tenanId,
                isTenant=isTenant,
                From = new EventFrom { Id = userId, DisplayName = userFullName }
            };
            AllTickets.Push(model);
            _ticketStream.OnNext(model);
            return model;
        }



        public void AddError(Exception exception) => _ticketStream.OnError(exception);
    }
}
