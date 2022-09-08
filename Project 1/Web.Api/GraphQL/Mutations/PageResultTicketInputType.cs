using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Mutations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class PageResultTicketInputType : InputObjectGraphType
    {
        public PageResultTicketInputType()
        {
            Name = "PageResultTicketInput";


            Field<LongGraphType>("count");
            Field<ListGraphType<TicketInputType>>("items");
        }
    }
}