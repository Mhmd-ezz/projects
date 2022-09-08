using System;
using System.Linq;
using System.Reactive.Linq;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Subscription;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.GraphQL.Subscriptions;

namespace Medcilia.Clinic.WebApi.GraphQL.sub
{
    public class Subscription : ObjectGraphType<object>
    {
        private readonly IChat _chat;
        private readonly IAppointmentsSubscribtions _appointments;
        private readonly ITicketsSubscribtions _tickets;

        public Subscription(
            IChat chat,
            IAppointmentsSubscribtions appointments,
            ITicketsSubscribtions tickets
            )
        {
            _chat = chat;
            _appointments = appointments;
            _tickets = tickets;


            AddField(new EventStreamFieldType
            {
                Name = "messageAdded",
                Type = typeof(MessageType),
                Resolver = new FuncFieldResolver<Message>(ResolveMessage),
                Subscriber = new EventStreamResolver<Message>(Subscribe)
            });

            AddField(new EventStreamFieldType
            {
                Name = "messageAddedByUser",
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                Type = typeof(MessageType),
                Resolver = new FuncFieldResolver<Message>(ResolveMessage),
                Subscriber = new EventStreamResolver<dynamic>(SubscribeById)
            });

            AddField(new EventStreamFieldType
            {
                Name = "appointmentEvent",
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "tenantId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userId" }
                ),
                Type = typeof(AppointmentEventType),
                Resolver = new FuncFieldResolver<dynamic>(Resolve),
                Subscriber = new EventStreamResolver<AppointmentEvent>(SubscribeAppointmentByTenantId)
            });
            AddField(new EventStreamFieldType
            {
                Name = "ticketEvent",
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "tenantId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userId" }
                ),
                Type = typeof(TicketEventType),
                Resolver = new FuncFieldResolver<dynamic>(Resolve),
                Subscriber = new EventStreamResolver<TicketEvent>(SubscribeTicketByTenantId)
            });
            AddField(new EventStreamFieldType
            {
                Name = "ticketEventAdmin",               
                Type = typeof(TicketEventType),
                Resolver = new FuncFieldResolver<dynamic>(Resolve),
                Subscriber = new EventStreamResolver<TicketEvent>(SubscribeTicketByAdmin)
            });
        }
        private IObservable<TicketEvent> SubscribeTicketByAdmin(IResolveEventStreamContext context)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            var identity = userContext?.User?.Identity;

            var events = _tickets.TicketsEvents();
            //string tenantId = context.GetArgument<string>("tenantId");
            string userId = context.GetArgument<string>("userId");
            // @ important add below line to where on production
            // && message.From.Id != userId
            return events.Where(message => message.isTenant==true);
        }
        private IObservable<AppointmentEvent> SubscribeAppointmentByTenantId(IResolveEventStreamContext context)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            var identity = userContext?.User?.Identity;
            
            var events = _appointments.AppointmentsEvents();
            string tenantId = context.GetArgument<string>("tenantId");
            string userId = context.GetArgument<string>("userId");
            // @ important add below line to where on production
            // && message.From.Id != userId
            return events.Where(message => message.tenantId != null && message.tenantId == tenantId && message.From.Id != userId);
        }
        private IObservable<TicketEvent> SubscribeTicketByTenantId(IResolveEventStreamContext context)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            var identity = userContext?.User?.Identity;

            var events = _tickets.TicketsEvents();
            string tenantId = context.GetArgument<string>("tenantId");
            string userId = context.GetArgument<string>("userId");
            string ticketNumber = context.GetArgument<string>("ticketNumber");
            // @ important add below line to where on production
            // && message.From.Id != userId
            return events.Where(message => message.From.Id != userId && message.tenantId == tenantId);// && message.tenantId == tenantId && message.From.Id != userId);
        }
        private dynamic Resolve(IResolveFieldContext context)
        {
            return context.Source;
        }


        // @ TO BE DELETED
        private IObservable<dynamic> SubscribeById(IResolveEventStreamContext context)
        {
            var messages = _chat.Messages();
            string id = context.GetArgument<string>("id");
            return messages.Where(message => message.From != null && message.From.Id == id);
        }
        private Message ResolveMessage(IResolveFieldContext context)
        {
            var message = context.Source as Message;
            return message;
        }

        private IObservable<Message> Subscribe(IResolveEventStreamContext context)
        {
            return _chat.Messages();
        }
    }
}
