using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class EventFromType : ObjectGraphType<EventFrom>
    {
        public EventFromType()
        {
            Field(o => o.Id);
            Field(o => o.DisplayName);
        }
    }
}
