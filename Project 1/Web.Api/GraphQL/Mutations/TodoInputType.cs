using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class TodoInputType : InputObjectGraphType
    {
        public TodoInputType()
        {
            Name = "TodoInput";
            Field<StringGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("title");
            Field<StringGraphType>("notes");
            Field<DateTimeGraphType>("startDate");
            Field<DateTimeGraphType>("dueDate");
            Field<BooleanGraphType>("isCompleted");
            Field<BooleanGraphType>("isStarred");
            Field<BooleanGraphType>("isImportant");
            Field<StringGraphType>("patientId");
        }
    }
}
