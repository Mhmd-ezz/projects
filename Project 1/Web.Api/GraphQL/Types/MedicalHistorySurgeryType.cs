using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class MedicalHistorySurgeryType : ObjectGraphType<MedicalHistorySurgeryModel>
    {
        public MedicalHistorySurgeryType()
        {
            Name = "MedicalHistorySurgery";

            Field(h => h.Alert, nullable: true).Description("");
            Field(h => h.LastUpdate, nullable: true).Description("");
            Field(h => h.Data, nullable: true, type: typeof(ListGraphType<SurgicalHistoryType>)).Description("");
        
        }
    }
}
