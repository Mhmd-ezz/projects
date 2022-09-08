using AutoMapper;
using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class LookupViewModelType : ObjectGraphType<LookupViewModel>
    {
        public LookupViewModelType()
        {
            Name = "LookupView";
            Field(h => h.Group, nullable: true).Description("The group of the lookup.");
            Field(h => h.Value, nullable: true).Description("Value of the lookup.");
            Field(h => h.Text, nullable: true).Description("The display text of the lookup.");
        }
    }
}
