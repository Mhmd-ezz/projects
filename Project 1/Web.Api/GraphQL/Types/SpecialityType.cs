using System.Collections.Generic;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.Infrastructure.Repository.Settings;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class SpecialityType : ObjectGraphType<SpecialityModel>
    {
        public SpecialityType()
        {
            Name = "Speciality";

            Field<GeneralType>("general",resolve: context =>context.Source.General);
            Field<CardiologyType>("cardiology", resolve: context =>context.Source.Cardiology);
            //Field<ObstetricType>("obstetric",resolve: context =>context.Source.Obstetric);
        }
    }
}
