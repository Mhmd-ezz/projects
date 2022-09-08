using System.Collections.Generic;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class PatientInfoType : ObjectGraphType<PatientModel>
    {
        public PatientInfoType(IContactRepository contactRepository, IMapper mapper)
        {
            Name = "PatientInfo";

            Field(h => h.BloodType, nullable: true).Description("The blood type of the patient.");
            Field(h => h.MaritalStatus, nullable: true).Description("The marital status of the patient.");
            Field(h => h.EmergancyContact, nullable: true).Description("The Emergancy Contact of the patient.");
            Field(h => h.EntryDate, nullable: true, type: typeof(DateTimeGraphType)).Description("Entry Date.");
            Field(h => h.FileNumber, nullable: true).Description("The File Number (papers) of the patient.");
            Field(h => h.Referral, nullable: true).Description("Who reffered this patient.");
            Field(h => h.LastSeen, nullable: true).Description("A date represents the last activity date ");
            Field(h => h.TotalDigitizedData, nullable: true).Description("Percentage of process moving from patient paper files to Digitized.");
            Field(h => h.Flags, nullable: true).Description("Patient's flags.");
            Field(h => h.Grantors, nullable: true, type: typeof(ListGraphType<GrantorType>)).Description("The grantors of the patient");
            Field(h => h.Tags, nullable: true, type: typeof(ListGraphType<TagType>)).Description("The tags of the patient");
            Field(h => h.CreatedOn, nullable: true, type: typeof(DateTimeGraphType)).Description("Creation Date.");
            Field(h => h.Modified, nullable: true, type: typeof(DateTimeGraphType)).Description("Modified Date.");
            //Field(h => h.Media, nullable: true, type: typeof(ListGraphType<MediaFileType>)).Description("The media of the patient");
            //Field(h => h.MediaFiles, nullable: true, type: typeof(MediaRootType)).Description("The media of the patient");
            Field<SpecialityType>("specialities",resolve: context =>context.Source.Specialities);
        }
    }
}
