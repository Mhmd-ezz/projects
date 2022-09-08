
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class CardiologyActivitiesType : ObjectGraphType<CardiologyActivitiesModel>
    {
        public CardiologyActivitiesType()
        {
            Name = "CardiologyActivities";

            Field(h => h.Followups, nullable: true,type:typeof(ListGraphType<CardiologyFollowupType>)).Description("");
            Field(h => h.Operations, nullable: true,type:typeof(ListGraphType<CardiologyOperationType>)).Description("");

        }
    }
}
