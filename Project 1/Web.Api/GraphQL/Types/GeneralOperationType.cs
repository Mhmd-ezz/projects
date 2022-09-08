using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class GeneralOperationType : ObjectGraphType<GeneralOperationModel>
    {
        public GeneralOperationType( IMapper mapper)
        {
            Name = "GeneralOperation";

            Field(h => h.Id, nullable: true).Description("");
            Field(h => h.Name, nullable: true).Description("");
            Field(h => h.Type, nullable: true).Description("");
            Field(h => h.Status, nullable: true).Description("");
            Field(h => h.SubLocation, nullable: true).Description("The sub-location that inherets from location.");
            Field(h => h.IsDuplicate, nullable: true).Description("A remark to identify if a operation is duplicated.");
            Field(h => h.Opened, nullable: true, type: typeof(DateTimeGraphType)).Description("");
            Field(h => h.Closed, nullable: true, type: typeof(DateTimeGraphType)).Description("");
            Field(h => h.Location, nullable: true, type: typeof(LocationViewType)).Description("");
            Field(h => h.Department, nullable: true).Description("");
            Field(h => h.Anesthesia, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Code, nullable: true,type:typeof(ListGraphType<StringGraphType>)).Description("");
            Field(h => h.OperationType, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.OperationPerformed, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.OperationDiagnosis, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.OperationPostDiagnosis, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.OperationPreFindings, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.OperationCategory, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.PhysicalExam, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Surgeons, nullable: true,type: typeof(DataPartitionType)).Description("");
            Field(h => h.OperationDetails, nullable: true).Description("");
        }
    }
}
