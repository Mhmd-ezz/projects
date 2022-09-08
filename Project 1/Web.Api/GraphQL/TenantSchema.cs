using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.sub;
using Medcilia.Clinic.WebApi.GraphQL.Subscriptions;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Medcilia.Clinic.WebApi.GraphQL
{
    public class TenantSchema : Schema
    {
        //public TenantSchema(IDependencyResolver resolver) : base(resolver)
        public TenantSchema(IChat chat, IAppointmentsSubscribtions appointmentsSubscribtions, ITicketsSubscribtions ticketsSubscribtions, IServiceProvider serviceProvider) : base(serviceProvider)
        {
            //Query = resolver.Resolve<TenantQuery>();
            //Mutation = resolver.Resolve<TenantMutation>();
            Query = serviceProvider.GetRequiredService<TenantQuery>();
            Mutation = serviceProvider.GetRequiredService<TenantMutation>();        

            Subscription = new Subscription(chat, appointmentsSubscribtions, ticketsSubscribtions);
            //Subscription = serviceProvider.GetRequiredService<Subscription>();
        }
    }
}
