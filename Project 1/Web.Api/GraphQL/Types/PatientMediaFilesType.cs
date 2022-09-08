using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class PatientMediaFilesType : ObjectGraphType<PatientMediaFilesViewModel>
    {
        public PatientMediaFilesType()
        {
            Name = "PatientsMediaFiles";

            Field(h => h.Id, nullable: true).Description("ID of patient");
            Field(h => h.PatientName, nullable: true).Description("Patient name");
            Field(h => h.ImagesCount, nullable: true).Description("Total patient images");
            Field(h => h.PdfCount, nullable: true).Description("Total patient PDF files");
            Field(h => h.Pool, nullable: true, type: typeof(ListGraphType<MediaFileType>)).Description("List of files found in patient pool");
            Field(h => h.Files, nullable: true, type: typeof(ListGraphType<MediaFileType>)).Description("List of files found in patient activities");
        }
    }
}
