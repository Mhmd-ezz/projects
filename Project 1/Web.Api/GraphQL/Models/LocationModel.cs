namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class LocationModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Type { get; set; }
        public string Address { get; set; }
        public string[] SubLocations { get; set; }

    }
}
