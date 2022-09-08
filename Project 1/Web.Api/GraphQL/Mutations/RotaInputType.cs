using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class RotaInputType : InputObjectGraphType
    {
        public RotaInputType()
        {
            Name = "RotaInput";
            Field<StringGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("color");
            Field<LocationViewInputType>("location");
            Field<ListGraphType<RecurrenceInputType>>("recurrence");
        }
    }
}
