using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class DrugType : ObjectGraphType<DrugModel>
    {
        public DrugType()
        {
            Name = "Drug";

            Field(h => h.Id, nullable: true).Description("");
            Field(h => h.AtcCode, nullable: true).Description("");
            Field(h => h.Name, nullable: true).Description("");
            Field(h => h.Dosage, nullable: true).Description("");
            Field(h => h.Form, nullable: true).Description("");
            //Field(h => h.Route, nullable: true).Description("");
            //Field(h => h.Agent, nullable: true).Description("");
            //Field(h => h.Laboratory, nullable: true).Description("");
            //Field(h => h.Presentation, nullable: true).Description("");
            //Field(h => h.Price, nullable: true).Description("");
            //Field(h => h.Country, nullable: true).Description("");
        }
    }
}
