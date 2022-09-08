using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class SurgicalHistoryType : ObjectGraphType<SurgicalHistoryModel>
    {
        public SurgicalHistoryType()
        {
            Name = "SurgicalHistory";

            Field(h => h.Note, nullable: true).Description("");
            Field(h => h.What, nullable: true).Description("");
            Field(h => h.When, nullable: true).Description("");

        }
    }
}

