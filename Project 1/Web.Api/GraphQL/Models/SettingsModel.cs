using System.Collections.Generic;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class SettingsModel
    {
        public string Id { get; set; }
        //TODO : List of specialities ENUM
        public List<string> Specialties { get; set; }
    }
}
