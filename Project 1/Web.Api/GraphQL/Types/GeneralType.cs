using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class GeneralType : ObjectGraphType<GeneralModel>
    {
        public GeneralType()
        {
            Name = "General";

            Field(h => h.Conditions, nullable: true,type:typeof(ListGraphType<GeneralConditionType>)).Description("");
            Field(h => h.MedicalHistory, nullable: true,type:typeof(GeneralMedicalHistoryType)).Description("");

            //Field<ListGraphType<ConditionType>>(
            //    "conditions",
            //    resolve: context => context.Source.Conditions
            //);

        }
    }
}
