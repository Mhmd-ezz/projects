using AutoMapper;
using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class DrugViewType : ObjectGraphType<DrugViewModel>
    {
        public DrugViewType()
        {
            Name = "DrugView";
            Field(h => h.Id, nullable: true).Description("The id of the drug.");
            Field(h => h.Name, nullable: true).Description("The name of the drug.");
            //Field(h => h.AtcCode, nullable: true).Description("ATC/DDD International language for drug utilization research The Anatomical Therapeutic Chemical(ATC) classification system and the Defined Daily Dose(DDD) , see : https://www.whocc.no/.");
           Field(h => h.Dosage, nullable: true).Description("Drug Dosage Ex :20mg or 20mg/10ml.");
            //Field(h => h.Form, nullable: true).Description("The type of drug Ex: Capsule, tabs, Injectable solution.");
            //Field(h => h.Presentation, nullable: true).Description("The quantity of tabs in box.");
            //Field(h => h.Route, nullable: true).Description("The way of usage Ex: Oral, Ophtalmic,Rectal for suppo");
        }
    }
}
