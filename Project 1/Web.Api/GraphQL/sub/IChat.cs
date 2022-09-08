using System;
using System.Collections.Concurrent;
using System.Reactive.Linq;
using System.Reactive.Subjects;

namespace Medcilia.Clinic.WebApi.GraphQL.sub
{
    public interface IChat
    {
        ConcurrentStack<Message> AllMessages { get; }
        //ConcurrentStack<AppointmentEvent> AllAppointments { get; }


        Message AddMessage(Message message);
        Message AddMessage(ReceivedMessage message);

        //AppointmentEvent AppointmentCreated(AppointmentModel message, string tenantId);


        IObservable<Message> Messages();

        //IObservable<AppointmentEvent> AppointmentsEvents();

    }

    public class Chat : IChat
    {
        private readonly ISubject<Message> _messageStream = new ReplaySubject<Message>(1);
        //private readonly ISubject<AppointmentEvent> _appointmentStream = new ReplaySubject<AppointmentEvent>(1);

        public Chat()
        {
            AllMessages = new ConcurrentStack<Message>();
            //AllAppointments = new ConcurrentStack<AppointmentEvent>();
            Users = new ConcurrentDictionary<string, string>
            {
                ["1"] = "developer",
                ["2"] = "tester"
            };
        }

        public ConcurrentDictionary<string, string> Users { get; set; }

        public ConcurrentStack<Message> AllMessages { get; }

        //public ConcurrentStack<AppointmentEvent> AllAppointments { get; }

        public Message AddMessage(ReceivedMessage message)
        {
            if (!Users.TryGetValue(message.FromId, out string displayName))
            {
                displayName = "(unknown)";
            }

            return AddMessage(new Message
            {
                Content = message.Content,
                SentAt = message.SentAt,
                From = new MessageFrom
                {
                    DisplayName = displayName,
                    Id = message.FromId
                }
            });
        }

        public Message AddMessage(Message message)
        {
            AllMessages.Push(message);
            _messageStream.OnNext(message);
            return message;
        }

        public IObservable<Message> Messages()
        {
            return _messageStream
                .Select(message =>
                {
                    message.Content = message.Content;
                    return message;
                })
                .AsObservable();
        }

        public void AddError(Exception exception) => _messageStream.OnError(exception);

        //public IObservable<AppointmentEvent> AppointmentsEvents()
        //{
        //    return _appointmentStream
        //        .Select(message =>
        //        {
        //            message.Content = message.Content;
        //            return message;
        //        })
        //        .AsObservable();
        //}

        //public AppointmentEvent AppointmentCreated(AppointmentModel message, string tenanId)
        //{

        //    var model = new AppointmentEvent
        //    {
        //        Content = new AppointmentModel { Color = "ree" },
        //        SentAt = DateTime.Now,
        //        tenantId = tenanId,
        //        From = new MessageFrom { Id = "123", DisplayName = "Unknown" }
        //    };
        //    AllAppointments.Push(model);
        //    _appointmentStream.OnNext(model);
        //    return model;
        //}
    }
}
