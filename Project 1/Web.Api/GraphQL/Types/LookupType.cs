using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Lookup;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class LookupType : ObjectGraphType<LookupModel>
    {
        public LookupType(ILookupRepository repository, IMapper mapper)
        {
            Name = "Lookup";

            Field(h => h.Id, nullable: true).Description("The id of the lookup.");
            Field(h => h.TenantId, nullable: true).Description("The tenantId of the lookup.");
            Field(h => h.GroupKey, nullable: true).Description("The groupKey of the lookup.");
            Field(h => h.Value, nullable: true).Description("Value of the lookup.");
            Field(h => h.Symbol, nullable: true).Description("Symbol of the lookup.");
            Field(h => h.Text, nullable: true).Description("The display text of the lookup.");
            Field(h => h.Description, nullable: true).Description("The description of the lookup.");
            Field(h => h.CultureName, nullable: true).Description("The culture of the lookup.");
            Field(h => h.ParentValue, nullable: true).Description("The Parent value of the lookup.");
            Field(h => h.ParentId, nullable: true).Description("Parent value");
            Field(h => h.CreatedDate, nullable: true).Description("Created Date.");
            Field(h => h.ModifiedDate, nullable: true).Description("Modified Date");
            Field(h => h.Order, nullable: true).Description("The order of the lookup entry in a list");
            Field(h => h.Predefined, nullable: true).Description("Whether the lookup entry is predefined.");
        }
    }
}
