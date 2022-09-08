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
    public class GeneralConditionType : ObjectGraphType<GeneralConditionModel>
    {
        public GeneralConditionType( )
        {
            Name = "GeneralCondition";

            Field(h => h.Id, nullable: true).Description("The id of the Condition.");
            Field(h => h.Name, nullable: true).Description("The name of the Condition.");
            Field(h => h.Type, nullable: true).Description("The type of the Condition.");
            Field(h => h.Status, nullable: true).Description("The status of the Condition.");
            Field(h => h.SubLocation, nullable: true).Description("The sub-location that inherets from location.");
            Field(h => h.Opened, nullable: true, type: typeof(DateTimeGraphType)).Description("The opening date of the Condition.");
            Field(h => h.Closed, nullable: true, type: typeof(DateTimeGraphType)).Description("The closing date of the Condition.");
            //Field(h => h.Statistics, nullable: true).Description("The status of the Condition.");
            Field(h => h.Location, nullable: true, type: typeof(LocationViewType)).Description("");
            //Field(h => h.Media, nullable: true,type:typeof(ListGraphType<MediaFileType>)).Description("The list of media of the Condition.");
            Field(h => h.CheifComplaint, nullable: true,type:typeof(DataPartitionType)).Description("The list of Cheif Complaint of the Condition.");
            Field(h => h.PresentHistory, nullable: true,type:typeof(DataPartitionType)).Description("The list of Present History of the Condition.");
            Field(h => h.Diagnosis, nullable: true,type:typeof(DataPartitionType)).Description("The list of Diagnosis of the Condition.");
            Field(h => h.DifferentialDiagnosis, nullable: true,type:typeof(DataPartitionType)).Description("The list of Differential Diagnosis of the Condition.");
            Field(h => h.Consultation, nullable: true,type:typeof(DataPartitionType)).Description("The list of Consultations of the Condition.");
            //Field(h => h.Medication, nullable: true,type:typeof(DataPartitionType)).Description("The list of Medications of the Condition.");
            Field(h => h.OtherTreatments, nullable: true,type:typeof(DataPartitionType)).Description("The list of OtherTreatments of the Condition.");
            Field(h => h.PhysicalExam, nullable: true,type:typeof(DataPartitionType)).Description("The list of physical exam of the Condition.");
            Field(h => h.Laboratory, nullable: true,type:typeof(DataPartitionType)).Description("The list of Laboratory test of the Condition.");
            Field(h => h.Radio, nullable: true,type:typeof(DataPartitionType)).Description("The list of Radio of the Condition.");
            Field(h => h.Note, nullable: true,type:typeof(DataPartitionType)).Description("The list of notes of the Condition.");
            Field(h => h.IsDuplicate, nullable: true).Description("A remark to identify if a condition is duplicated.");
            Field(h => h.IsHidden, nullable: true).Description("The show/hide status of the condition.");


            // Field(h => h.MediaFiles, nullable: true, type: typeof(MediaRootType)).Description("The list of media files of the Condition.");
            Field(h => h.Medications, nullable: true,type:typeof(ListGraphType<MedicationType>)).Description("");
            Field(h => h.Activities, nullable: true,type:typeof(GeneralActivitiesType)).Description("");
        }
    }
}
