using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class ConditionType : ObjectGraphType<ConditionModel>
    {
        public ConditionType( IMapper mapper)
        {
            Name = "Condition";

            Field(h => h.Name, nullable: true).Description("The name of the Condition.");
            Field(h => h.Type, nullable: true).Description("The type of the Condition.");
            Field(h => h.Closed, nullable: true).Description("The closing date of the Condition.");
            Field(h => h.Opened, nullable: true, type: typeof(DateTimeGraphType)).Description("The opening date of the Condition.");
            Field(h => h.Status, nullable: true, type: typeof(DateTimeGraphType)).Description("The status of the Condition.");
            //Field(h => h.Location, nullable: true, type: typeof(ListGraphType<LocationViewType>)).Description("");

            //Field(h => h.Statistics, nullable: true).Description("The status of the Condition.");
        }
    }
}
