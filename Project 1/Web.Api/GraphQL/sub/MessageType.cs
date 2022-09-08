using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.sub
{
    public class MessageType : ObjectGraphType<Message>
    {
        public MessageType()
        {
            Field(o => o.Content);
            Field(o => o.SentAt, type: typeof(DateGraphType));
            Field(o => o.Sub, nullable: true);
            Field(o => o.From, false, typeof(MessageFromType)).Resolve(ResolveFrom);
        }

        private MessageFrom ResolveFrom(IResolveFieldContext<Message> context)
        {
            //return new MessageFrom()
            //{
            //    DisplayName = "hasan",
            //    Id = "1"
            //};
            var message = context.Source;
            return message.From;
        }
    }

   
}
