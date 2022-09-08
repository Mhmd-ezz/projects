using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class TodoType : ObjectGraphType<TodoModel>
    {
        public TodoType()
        {
            Name = "Todo";

            Field(h => h.Id, nullable: true).Description("Id of the Todos");
            Field(h => h.Title, nullable: true).Description("Title of the Todos");
            Field(h => h.Notes, nullable: true).Description("Notes of the Todos");
            Field(h => h.StartDate, nullable: true).Description("Start Date of the Todos");
            Field(h => h.DueDate, nullable: true).Description("Due Date of the Todos");
            Field(h => h.IsCompleted, nullable: true).Description("Completed of the Todos");
            Field(h => h.IsStarred, nullable: true).Description("Starred of the Todos");
            Field(h => h.IsImportant, nullable: true).Description("Important of the Todos");
            Field(h => h.PatientId, nullable: true).Description("Patient Id of the Todos");
        }
    }
}
