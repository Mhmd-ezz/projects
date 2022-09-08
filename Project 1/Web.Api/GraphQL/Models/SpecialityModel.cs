using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Infrastructure.Domain;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class SpecialityModel
    {
        public GeneralModel General { get; set; }
        public CardiologyModel Cardiology { get; set; }
    }
}
