using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Subscription;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class SubscriptionType : ObjectGraphType<SubscriptionModel>
    {
        public SubscriptionType(ISubscriptionRepository subscriptionRepository, IMapper mapper)
        {
            // @ using SubscriptionType rather than Subscription to avoid fragments conflict
            // @ plugins rejecting subscription as a type
            Name = "SubscriptionType";

            Field(h => h.Id, nullable: true).Description("The id of the subscription.");
            Field(h => h.Amount, nullable: true).Description("The amount of subscription.");
            Field(h => h.DayCount, nullable: true).Description("The total subscribed dates.");
            Field(h => h.Edition, nullable: true).Description("The selected edition of subscription.");
            Field(h => h.ExpireDate, nullable: true).Description("The expire date of subscription.");
            Field(h => h.GrossAmount, nullable: true).Description("The groos amount of subscription.");
            Field(h => h.PaymentMethod, nullable: true).Description("The payment method used for subscription.");
            Field(h => h.ProcessTime, nullable: true).Description("The date of subscription.");
            Field(h => h.Status, nullable: true).Description("The current status of subscription.");
            
        }
    }
}
