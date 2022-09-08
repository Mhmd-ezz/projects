using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Repository.Drug;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class MedicationType : ObjectGraphType<MedicationModel>
    {
        public MedicationType(IDrugRepository drugRepository, IMapper mapper)
        {
            Name = "Medication";

            Field(h => h.Frequency, nullable: true).Description("");
            Field(h => h.Note, nullable: true).Description("");
            Field(h => h.IsActive, nullable: true).Description("");
            Field(h => h.UsageType, nullable: true).Description("");
            Field(h => h.NoSubstitutes, nullable: true).Description("");
            Field(h => h.StartDate, nullable: true).Description("");
            Field(h => h.EndDate, nullable: true).Description("");
            Field(h => h.DescribedBy, nullable: true).Description("");
            Field(h => h.Drug, nullable: true, type: typeof(DrugViewType)).Description("");
            //Field<DrugType>(
            //    "drug",
            //    resolve: context =>
            //    {
            //        var drug = drugRepository.GetById(context.Source.DrugId.ToString());
            //        var mapped = mapper.Map<DrugModel>(drug);
            //        return mapped;
            //    }
            //);
        }
    }
}
