using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class ConditionInputType : InputObjectGraphType
    {
        public ConditionInputType()
        {
            Name = "ConditionInput";
            Field<StringGraphType>("patientId");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<StringGraphType>("diagnosis");
            Field<DateTimeGraphType>("closed");
            Field<DateTimeGraphType>("opened");
            Field<StringGraphType>("status");
            Field<StringGraphType>("type");
            Field<BooleanGraphType>("isDuplicate");
            Field<BooleanGraphType>("isHidden");
        }

    }
}
