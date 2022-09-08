using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class GrantorInputType : InputObjectGraphType
    {
        public GrantorInputType()
        {
            Name = "GrantorInput";
            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("name");

        }
    }
}
