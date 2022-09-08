using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Settings;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class SettingsType : ObjectGraphType<SettingsModel>
    {
        public SettingsType(ISettingsRepository settingsRepository, IMapper mapper)
        {
            Name = "Settings";

            Field(h => h.Id, nullable: true).Description("The id.");
            Field(h => h.Specialties, nullable: true).Description("The assigned specialties to a tenant.");
            
        }
    }
}
