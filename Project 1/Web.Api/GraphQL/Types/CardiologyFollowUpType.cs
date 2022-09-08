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
    public class CardiologyFollowupType : ObjectGraphType<CardiologyFollowupModel>
    {
        public CardiologyFollowupType( IMapper mapper)
        {
            Name = "CardiologyFollowup";

            Field(h => h.Id, nullable: true).Description("");
            Field(h => h.Name, nullable: true).Description("");
            Field(h => h.Type, nullable: true).Description("");
            Field(h => h.Status, nullable: true).Description("");
            Field(h => h.SubLocation, nullable: true).Description("The sub-location that inherets from location.");
            Field(h => h.IsDuplicate, nullable: true).Description("A remark to identify if a followup is duplicated.");
            Field(h => h.Opened, nullable: true, type: typeof(DateTimeGraphType)).Description("");
            Field(h => h.Closed, nullable: true, type: typeof(DateTimeGraphType)).Description("");
            Field(h => h.Location, nullable: true, type: typeof(LocationViewType)).Description("");
            //Field(h => h.Media, nullable: true,type:typeof(ListGraphType<MediaFileType>)).Description("");
            Field(h => h.Subjective, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Diagnosis, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Medication, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.OtherTreatments, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Assessment, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Consultation, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.PhysicalExam, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Laboratory, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Note, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.Radio, nullable: true,type:typeof(DataPartitionType)).Description("");
            Field(h => h.IsHidden, nullable: true).Description("The show/hide status of the condition.");

            //Field(h => h.MediaFiles, nullable: true, type: typeof(MediaRootType)).Description("The list of media files of the Condition.");
            Field(h => h.Medications, nullable: true, type: typeof(ListGraphType<MedicationType>)).Description("");

            Field(h => h.CardiologyClinicalExamination, nullable: true, type: typeof(CardiologyClinicalExaminationType)).Description("");

        }
    }
}
