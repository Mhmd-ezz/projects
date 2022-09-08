using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class GeneralActivitiesType : ObjectGraphType<GeneralActivitiesModel>
    {
        public GeneralActivitiesType()
        {
            Name = "GeneralActivities";

            Field(h => h.Followups, nullable: true,type:typeof(ListGraphType<GeneralFollowupType>)).Description("");
            Field(h => h.Operations, nullable: true,type:typeof(ListGraphType<GeneralOperationType>)).Description("");

        }
    }
}
