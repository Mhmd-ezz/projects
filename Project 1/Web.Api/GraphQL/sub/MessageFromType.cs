using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.sub
{
    public class MessageFromType : ObjectGraphType<MessageFrom>
    {
        public MessageFromType()
        {
            Field(o => o.Id);
            Field(o => o.DisplayName);
        }
    }
}
