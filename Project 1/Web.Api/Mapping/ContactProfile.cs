using AutoMapper;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.Common.Extensions;
using System.Linq;
using System;

namespace Medcilia.Clinic.WebApi.Mapping
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            //-------------------------------------------------------------------------------
            //  @ Contact
            //-------------------------------------------------------------------------------
            CreateMap<Contact, ContactModel>(MemberList.Destination)
                //.ForMember(dest => dest.PatientInfo, opt => opt.Ignore())
                ;

            CreateMap<ContactModel, Contact>(MemberList.None)
                .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Partner, opt => opt.MapFrom(s => s.Partner.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Occupation, opt => opt.MapFrom(s => s.Occupation.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(s => s.Country.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.City, opt => opt.MapFrom(s => s.City.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.ContactType, opt => opt.Ignore())
                .ForMember(d => d.ContactTypeKey, o => o.MapFrom(s => s.ContactType))
                .ForMember(dest => dest.TenantId, opt => opt.Ignore());


            //----------------------------------------------------------------------------------
            //  @ Patient
            //----------------------------------------------------------------------------------
            CreateMap<Patient, PatientModel>(MemberList.Destination)
                .ForMember(obj => obj.Grantors,exp => exp.MapFrom<GrantorFromRefDbResolver>())
                .ForMember(obj => obj.Tags, exp => exp.MapFrom<TagFromRefDbResolver>())
                ;


            CreateMap<PatientModel, Patient>(MemberList.None)
                //.ForMember(dest => dest.Referral, opt => opt.MapFrom(s => s.Referral.ConvertAll(e => e.Trim().Clean().ToSentenceCase())))
                .ForMember(dest => dest.BloodType, opt => opt.Ignore())
                .ForMember(d => d.BloodTypeKey, o => o.MapFrom(s => s.BloodType))
                .ForMember(dest => dest.MaritalStatus, opt => opt.Ignore())
                .ForMember(d => d.MaritalStatusKey, o => o.MapFrom(s => s.MaritalStatus))
                .ForMember(obj => obj.Grantors, exp => exp.MapFrom<GrantorToRefDbResolver>())
                .ForMember(obj => obj.Tags, exp => exp.MapFrom<TagToRefDbResolver>())
                ;


            //----------------------------------------------------------------------------------
            //  @ General Medical history
            //----------------------------------------------------------------------------------
            CreateMap<GeneralMedicalHistory, GeneralMedicalHistoryModel>(MemberList.Destination);
            CreateMap<GeneralMedicalHistoryModel, GeneralMedicalHistory>(MemberList.None);


            //----------------------------------------------------------------------------------
            //  @ Cardiology Medical history
            //----------------------------------------------------------------------------------
            CreateMap<CardiologyMedicalHistory, CardiologyMedicalHistoryModel>(MemberList.Destination) ;
            CreateMap<CardiologyMedicalHistoryModel, CardiologyMedicalHistory>(MemberList.None);

            //----------------------------------------------------------------------------------
            //  @ Cardiology Surgical history
            //----------------------------------------------------------------------------------
            CreateMap<CardiologySurgicalHistory, CardiologySurgicalHistoryModel>(MemberList.Destination)
                .ForMember(obj => obj.What,
                    exp => exp.MapFrom<CardiologySurgicalHistoryLookupFromRefDbResolver>());
            CreateMap<CardiologySurgicalHistoryModel, CardiologySurgicalHistory>(MemberList.None)
                 .ForMember(obj => obj.What, exp => exp.MapFrom<CardiologySurgicalHistoryLookupToRefDbResolver>())
                 ;

            //----------------------------------------------------------------------------------
            //  @ Cardiology Medical history Surgical
            //----------------------------------------------------------------------------------
            CreateMap<CardiologyMedicalHistorySurgery, CardiologyMedicalHistorySurgeryModel>(MemberList.Destination);
            CreateMap<CardiologyMedicalHistorySurgeryModel, CardiologyMedicalHistorySurgery>(MemberList.None);


            //----------------------------------------------------------------------------------
            //  @ Condition
            //----------------------------------------------------------------------------------
            CreateMap<Condition, ConditionModel>(MemberList.Destination);
            CreateMap<ConditionModel, Infrastructure.Domain.Condition>(MemberList.None)
                .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type));

            //----------------------------------------------------------------------------------
            //  @ General Conditions
            //----------------------------------------------------------------------------------
            CreateMap<GeneralCondition, GeneralConditionModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationFromRefDbResolver>());


            CreateMap<GeneralConditionModel, GeneralCondition>(MemberList.None)
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationToRefDbResolver>());

            //----------------------------------------------------------------------------------
            //  @ Cardiology Conditions
            //----------------------------------------------------------------------------------
            CreateMap<CardiologyCondition, CardiologyConditionModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationFromRefDbResolver>());


            CreateMap<CardiologyConditionModel, CardiologyCondition>(MemberList.None)
                .ForMember(dest => dest.Bmi, opt => opt.MapFrom(s => Math.Round(s.Bmi, 2) ))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationToRefDbResolver>());


            //----------------------------------------------------------------------------------
            //  @ General Followup
            //----------------------------------------------------------------------------------
            CreateMap<GeneralFollowup, GeneralFollowupModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationFromRefDbResolver>());


            CreateMap<GeneralFollowupModel, GeneralFollowup>(MemberList.None)
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationToRefDbResolver>());

            //----------------------------------------------------------------------------------
            //  @ Cardiology Followup
            //----------------------------------------------------------------------------------
            CreateMap<CardiologyFollowup, CardiologyFollowupModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationFromRefDbResolver>());


            CreateMap<CardiologyFollowupModel, CardiologyFollowup>(MemberList.None)
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationToRefDbResolver>());


            //----------------------------------------------------------------------------------
            //  @ General Operation
            //----------------------------------------------------------------------------------
            CreateMap<GeneralOperation, GeneralOperationModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationFromRefDbResolver>());


            CreateMap<GeneralOperationModel, GeneralOperation>(MemberList.None)
                //.ForMember(dest => dest.Department, opt => opt.MapFrom(s => s.Department.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationToRefDbResolver>());

            //----------------------------------------------------------------------------------
            //  @ Cardiology Operation
            //----------------------------------------------------------------------------------
            CreateMap<CardiologyOperation, CardiologyOperationModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationFromRefDbResolver>());


            CreateMap<CardiologyOperationModel, CardiologyOperation>(MemberList.None)
                //.ForMember(dest => dest.Department, opt => opt.MapFrom(s => s.Department.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<LocationToRefDbResolver>());


            //----------------------------------------------------------------------------------
            //  @ Drugs
            //----------------------------------------------------------------------------------
            CreateMap<Drug, DrugModel>(MemberList.Destination);
            CreateMap<DrugModel, Drug>(MemberList.None)
                //.ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean()))
                ;


            //----------------------------------------------------------------------------------
            //  @ Medical History Alert
            //----------------------------------------------------------------------------------
            CreateMap<MedicalHistoryAlertModel, MedicalHistoryAlert>()
                .ForMember(obj => obj.Data, exp => exp.MapFrom<LookupToRefDbResolver>());


            CreateMap<MedicalHistoryAlert, MedicalHistoryAlertModel>()
                .ForMember(obj => obj.Data, exp => exp.MapFrom<LookupFromRefDbResolver>());


            //----------------------------------------------------------------------------------
            //  @ Medication
            //----------------------------------------------------------------------------------
            CreateMap<MedicationModel, Medication>()
                .ForMember(dest => dest.DescribedBy, opt => opt.MapFrom(s => s.DescribedBy.Trim().Clean().ToSentenceCase()))
                .ForMember(obj => obj.Drug, exp => exp.MapFrom<DrugToRefDbResolver>());

            CreateMap<Medication, MedicationModel>()
                .ForMember(obj => obj.Drug, exp => exp.MapFrom<DrugFromRefDbResolver>());


            //----------------------------------------------------------------------------------
            //  @ DataPartition
            //----------------------------------------------------------------------------------
            CreateMap<DataPartitionModel, DataPartition>()
                .ForMember(obj => obj.Text, exp => exp.MapFrom<DataPartitionLookupToRefDbResolver>());


            CreateMap<DataPartition, DataPartitionModel>()
                .ForMember(obj => obj.Text, exp => exp.MapFrom<DataPartitionLookupFromRefDbResolver>());


            //----------------------------------------------------------------------------------
            //  @ MediaRoot
            //----------------------------------------------------------------------------------
            CreateMap<MediaRootModel, MediaRoot>()
                .ForMember(obj => obj.Files, exp => exp.MapFrom<MediaRootToRefDbResolver>());

            CreateMap<MediaRoot, MediaRootModel>()
                .ForMember(obj => obj.Files, exp => exp.MapFrom<MediaRootFromRefDbResolver>());

        }
    }
}
