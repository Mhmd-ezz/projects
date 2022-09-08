using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class MediaFileType : ObjectGraphType<MediaFileModel>
    {
        public MediaFileType()
        {
            Name = "MediaFile";

            Field(h => h.Id, nullable: true).Description("Id of the File.");
            Field(h => h.Name, nullable: true).Description("Name of the File.");
            Field(h => h.Path, nullable: true).Description("Path of the File.");
            Field(h => h.Type, nullable: true).Description("Type of the File.");
            Field(h => h.Size, nullable: true).Description("Size of the File.");
            Field(h => h.TenantId, nullable: true).Description("To which tenant this file belongs.");
            Field(h => h.PatientId, nullable: true).Description("To which patient this file belongs.");
            Field(h => h.PatientName, nullable: true).Description("Patient name that file belongs to.");
            Field(h => h.Speciality, nullable: true).Description("In which speciality the file exists.");
            Field(h => h.ConditionId, nullable: true).Description("In which condition the file exists.");
            Field(h => h.ActivityType, nullable: true).Description("Specified activity type Ex: (followup, operation).");
            Field(h => h.ActivityId, nullable: true).Description("In which activity the file exists.");
            Field(h => h.TicketNumber, nullable: true).Description("To which ticket this file belongs.");
            Field(h => h.IsDeleted, nullable: true).Description("If file is deleted.");
            Field(h => h.Modified, nullable: true).Description("Last modified date.");
            Field(h => h.DeletedOn, nullable: true).Description("Date of delete.");
            Field(h => h.SystemTagging, nullable: true).Description("Built-in tags.");
            Field(h => h.Tags, nullable: true, type: typeof(DataPartitionType)).Description("Custom tags.");
        }
    }
}
