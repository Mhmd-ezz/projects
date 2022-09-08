using AutoMapper;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.Models;
using MongoDB.Driver;
using Medcilia.Clinic.Common.Extensions;

namespace Medcilia.Clinic.WebApi.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            //----------------------------------------------------------------------------------
            //  @ Tenant
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Tenant, TenantModel>(MemberList.Destination)
                .ForMember(d => d.Speciality, o => o.MapFrom(s =>
                    new TupleModel()
                    {
                        Name = s.Speciality.DisplayName,
                        Key = s.SpecialityKey,
                        Group = "specialities"
                    }
                ))
                .ForMember(obj => obj.Status, exp => exp.MapFrom(x => x.Subscription.DisplayName));

            CreateMap<TenantModel, Infrastructure.Domain.Tenant>(MemberList.None)
                 .ForMember(dest => dest.Speciality, opt => opt.Ignore())
                 .ForMember(dest => dest.SpecialityKey, opt => opt.MapFrom(x => x.Speciality.Key))
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean().ToSentenceCase()));



            //----------------------------------------------------------------------------------
            //  @ User
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.User, UserModel>(MemberList.Destination);
            CreateMap<UserModel, Infrastructure.Domain.User>(MemberList.None)
                .ForMember(obj => obj.TenantId, exp => exp.Ignore());



            //----------------------------------------------------------------------------------
            //  @ User
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Rota, RotaModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<RotaLocationFromRefDbResolver>());

            CreateMap<RotaModel, Infrastructure.Domain.Rota>(MemberList.None)
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean().ToSentenceCase()))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<RotaLocationToRefDbResolver>());



            //----------------------------------------------------------------------------------
            //  @ Schedule
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Schedule, ScheduleModel>(MemberList.Destination);
            CreateMap<ScheduleModel, Infrastructure.Domain.Schedule>(MemberList.None)
                .ForMember(x => x.TenantId, y => y.Ignore());



            //----------------------------------------------------------------------------------
            //  @ Location
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Location, LocationModel>(MemberList.Destination);
            CreateMap<LocationModel, Infrastructure.Domain.Location>(MemberList.None)
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean().ToSentenceCase()))
                .ForMember(x => x.TenantId, y => y.Ignore());



            //----------------------------------------------------------------------------------
            //  @ Grantors
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Grantor, GrantorModel>(MemberList.Destination);
            CreateMap<GrantorModel, Infrastructure.Domain.Grantor>(MemberList.None)
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean().ToSentenceCase()));

            //----------------------------------------------------------------------------------
            //  @ Todos
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Todo, TodoModel>(MemberList.Destination);
            CreateMap<TodoModel, Infrastructure.Domain.Todo>(MemberList.None)
                 .ForMember(dest => dest.Title, opt => opt.MapFrom(s => s.Title.Trim().Clean().ToSentenceCase()));


            //----------------------------------------------------------------------------------
            //  @ Tags
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Tag, TagModel>(MemberList.Destination);
            CreateMap<TagModel, Infrastructure.Domain.Tag>(MemberList.None)
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name.Trim().Clean().ToSentenceCase()));

            //----------------------------------------------------------------------------------
            //  @ Tickets
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Ticket, TicketModel>(MemberList.Destination)
                 .ForMember(dest => dest.tenantName, opt => opt.Ignore())
                .ForMember(d => d.tenantName, o => o.MapFrom(s => s.Tenant.Name))
                .ForMember(d => d.TicketDate, o => o.MapFrom(s => s.Modified));
            CreateMap<TicketModel, Infrastructure.Domain.Ticket>(MemberList.None);

            //.ForMember(dest => dest.Subject, opt => opt.MapFrom(s => s.Subject.Trim().Clean().ToSentenceCase()));

            //----------------------------------------------------------------------------------
            //  @ Tickets Messages
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.TicketMessages, TicketMessagesModel>(MemberList.Destination);
            CreateMap<TicketMessagesModel, Infrastructure.Domain.TicketMessages>(MemberList.None);

            //----------------------------------------------------------------------------------
            //  @ MediaFiles
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.MediaFile, MediaFileModel>(MemberList.Destination);
            CreateMap<MediaFileModel, Infrastructure.Domain.MediaFile>(MemberList.None)
                .ForMember(dest => dest.SystemTagging, opt => opt.Ignore())
                .ForMember(d => d.SystemTaggingKey, o => o.MapFrom(s => s.SystemTagging))
                .ForMember(obj => obj.TenantId, exp => exp.MapFrom<TenantToRefDbResolver>());

            //----------------------------------------------------------------------------------
            //  @ Settings
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Settings, SettingsModel>(MemberList.Destination);
            CreateMap<SettingsModel, Infrastructure.Domain.Settings>(MemberList.None);

            CreateMap<Infrastructure.Services.PatientMediaFiles, PatientMediaFilesViewModel>(MemberList.Destination);


            //----------------------------------------------------------------------------------
            //  @ Subscription
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Subscription, SubscriptionModel>(MemberList.Destination);
            CreateMap<SubscriptionModel, Infrastructure.Domain.Subscription>(MemberList.None);


            //----------------------------------------------------------------------------------
            //  @ Lookups
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Services.Lookups.LookUp, LookupModel>(MemberList.Destination);
            CreateMap<LookupModel, Infrastructure.Services.Lookups.LookUp>(MemberList.None)
                //.ForMember(dest => dest.Text, opt => opt.MapFrom(s => s.Text.Trim().Clean().ToSentenceCase()))
                ;


            //----------------------------------------------------------------------------------
            //  @ Settings
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.Appointment, AppointmentModel>(MemberList.Destination)
                .ForMember(obj => obj.Location, exp => exp.MapFrom<AppointmentLocationFromRefDbResolver>())
                .ForMember(obj => obj.Contact, exp => exp.MapFrom<AppointmentContactFromRefDbResolver>());


            CreateMap<AppointmentModel, Infrastructure.Domain.Appointment>(MemberList.None)
                .ForMember(dest => dest.Reason, opt => opt.MapFrom(s => s.Reason.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Subject, opt => opt.MapFrom(s => s.Subject.Trim().Clean().ToSentenceCase()))
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(d => d.StatusKey, o => o.MapFrom(s => s.Status))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(d => d.TypeKey, o => o.MapFrom(s => s.Type))
                .ForMember(obj => obj.Location, exp => exp.MapFrom<AppointmentLocationToRefDbResolver>())
                .ForMember(obj => obj.Contact, exp => exp.MapFrom<AppointmentContactToRefDbResolver>());

            ;


            //----------------------------------------------------------------------------------
            //  @ Drugs
            //----------------------------------------------------------------------------------
            CreateMap<Infrastructure.Domain.PatientMedications, PatientMedicationsModel>(MemberList.Destination)
                .ForMember(obj => obj.Drug, exp => exp.MapFrom<PatientMedicationsDrugFromRefDbResolver>());
                //.ForMember(obj => obj.Drug, exp => exp.MapFrom<PatientMedicationsDrugFromRefDbResolver>());



            CreateMap<PatientMedicationsModel, Infrastructure.Domain.PatientMedications>(MemberList.None)
                .ForMember(dest => dest.Reason, opt => opt.MapFrom(s => s.Reason.Trim().Clean().ToSentenceCase()))
                .ForMember(obj => obj.Drug, exp => exp.MapFrom<PatientMedicationsDrugToRefDbResolver>())

            ;


        }
    }
}
