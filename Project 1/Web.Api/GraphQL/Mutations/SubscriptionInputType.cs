using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class SubscriptionInputType : InputObjectGraphType
    {
        public SubscriptionInputType()
        {
            Name = "SubscriptionInput";
            Field<StringGraphType>("id");
            Field<DateTimeGraphType>("processTime");
            Field<DateTimeGraphType>("expireDate");
            Field<StringGraphType>("paymentMethod");
            Field<StringGraphType>("amount");
            Field<StringGraphType>("edition");
            Field<StringGraphType>("dayCount");
            Field<StringGraphType>("garossAmount");
            Field<StringGraphType>("Status");
        }
    }
}
