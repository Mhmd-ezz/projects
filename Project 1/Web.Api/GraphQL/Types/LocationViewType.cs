using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class LocationViewType : ObjectGraphType<LocationViewModel>
    {
        public LocationViewType()
        {
            Name = "LocationViewType";

            Field(h => h.Id, nullable: true).Description("The id of the location.");
            Field(h => h.Name, nullable: true).Description("The name of the location.");
        }
    }
}
