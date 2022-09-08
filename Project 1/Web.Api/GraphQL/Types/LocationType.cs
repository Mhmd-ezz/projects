using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class LocationType : ObjectGraphType<LocationModel>
    {
        public LocationType(ILocationRepository locationRepository, IMapper mapper)
        {
            Name = "Location";

            Field(h => h.Id, nullable: true).Description("The id of the location.");
            Field(h => h.Name, nullable: true).Description("The name of the location.");
            Field(h => h.Contact, nullable: true).Description("the contact number of the location.");
            Field(h => h.Address, nullable: true).Description("The address of the location.");
            Field(h => h.Type, nullable: true).Description("The type of the location.");
            Field(h => h.SubLocations, nullable: true).Description("List of sub-locations.");

            //Field<ListGraphType<PatientConditionInterface>>(
            //    "conditions",
            //    resolve: context =>
            //    {
            //        var conditions = patientRepository.GetConditions(int.Parse(context.Source.Id));
            //        var mapped = mapper.Map<IEnumerable<PatientCondition>>(conditions);
            //        return mapped;
            //    }
            //);


            // Interface<PatientInterface>();
        }
    }
}
