using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class SettingsInputType : InputObjectGraphType
    {
        public SettingsInputType()
        {
            Name = "SettingsInput";
            Field<StringGraphType>("id");
            Field<ListGraphType<StringGraphType>>("specialties");
        }
    }
}
