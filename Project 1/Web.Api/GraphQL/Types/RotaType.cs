using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class RotaType : ObjectGraphType<RotaModel>
    {
        public RotaType()
        {
            Name = "Rota";

            Field(h => h.Id, nullable: true).Description("The id of the rota.");
            Field(h => h.Name, nullable: true).Description("The name of the rota.");
            Field(h => h.Color, nullable: true).Description("The sign color to rota.");
            Field(h => h.Location, nullable: true, type: typeof(LocationViewType)).Description("The location associated with the rota.");
            Field(h => h.Recurrence, nullable: true, type: typeof(ListGraphType<RecurrenceType>)).Description("The list of recurrence rules associated with the rota.");

        }
    }
}
