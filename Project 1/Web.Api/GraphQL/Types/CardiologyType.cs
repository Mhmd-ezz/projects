using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class CardiologyType : ObjectGraphType<CardiologyModel>
    {
        public CardiologyType()
        {
            Name = "Cardiology";

            Field(h => h.Conditions, nullable: true,type:typeof(ListGraphType<CardiologyConditionType>)).Description("");
            Field(h => h.MedicalHistory, nullable: true,type:typeof(CardiologyMedicalHistoryType)).Description("");

            //Field<ListGraphType<ConditionType>>(
            //    "conditions",
            //    resolve: context => context.Source.Conditions
            //);

        }
    }
}
