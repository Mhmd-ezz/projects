using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.GraphQL.Mutations;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class MedicalHistoryAlertType : ObjectGraphType<MedicalHistoryAlertModel>
    {
        public MedicalHistoryAlertType()
        {
            Name = "MedicalHistoryAlert";

            Field(h => h.Alert, nullable: true).Description("");
            Field(h => h.LastUpdate, nullable: true).Description("");
            Field(h => h.Data, nullable: true, type: typeof(ListGraphType<LookupViewModelType>)).Description("");           
            //Field<LookupViewModelType>("data",resolve: context =>context.Source.Data);

        }
    }
}
