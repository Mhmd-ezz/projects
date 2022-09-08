using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Subscriptions
{
    public class TicketEventType : ObjectGraphType<TicketEvent>
    {
        public TicketEventType()
        {
            Field(o => o.Content, type: typeof(TicketType));
            Field(o => o.Event, nullable: true);
            Field(o => o.SentAt, type: typeof(DateTimeGraphType));
            Field(o => o.Sub, nullable: true);
            Field(o => o.From, false, typeof(EventFromType)).Resolve(ResolveFrom);
        }

        private EventFrom ResolveFrom(IResolveFieldContext<TicketEvent> context)
        {
            var message = context.Source;
            return message.From;
        }
    }
}
