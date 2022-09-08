using Medcilia.Clinic.Infrastructure.Repository.Appointment;
using Medcilia.Clinic.Infrastructure.Repository.AppSettings;
using Medcilia.Clinic.Infrastructure.Repository.Drug;
using Medcilia.Clinic.Infrastructure.Repository.Grantor;
using Medcilia.Clinic.Infrastructure.Repository.Tag;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.Infrastructure.Repository.Lookup;
using Medcilia.Clinic.Infrastructure.Repository.MediaFile;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.Infrastructure.Repository.Rota;
using Medcilia.Clinic.Infrastructure.Repository.Schedule;
using Medcilia.Clinic.Infrastructure.Repository.Tenant;
using Medcilia.Clinic.Infrastructure.Repository.User;
using Medcilia.Clinic.Infrastructure.Repository.PatientMedications;
using MongoDB.Driver;
using Medcilia.Clinic.Infrastructure.Repository.Todo;
using Medcilia.Clinic.Infrastructure.Repository.Tickets;

namespace Medcilia.Clinic.Infrastructure
{
    public interface IUnitOfWork
    {
        IMongoClient Client { get; }
        IMongoDatabase Database { get; }

        IAppointmentRepository AppointmentRepository { get; }
        IRotaRepository RotaRepository { get; }
        IScheduleRepository ScheduleRepository { get; }
        ILocationRepository LocationRepository { get; }
        IContactRepository ContactRepository { get; }
        IDrugRepository DrugRepository { get; }
        ILookupRepository LookupRepository { get; }
        IGrantorRepository GrantorRepository { get; }
        ITagRepository TagRepository { get; }
        IAppSettingsRepository AppSettingsRepository { get; }
        IUserRepository UserRepository { get; }
        IMediaFileRepository MediaFileRepository { get; }
        ITenantRepository TenantRepository { get; }
        IMedicationsRepository PatientMedicationsRepository { get; }
        ITodoRepository TodoRepository { get; }
        ITicketRepository TicketRepository { get; }
        string ScheduleCollectionName { get; }
        string AppointmentCollectionName { get; }
        string RotaCollectionName { get; }
        string ContactCollectionName { get; }
        string GrantorCollectionName { get; }
        string TagCollectionName { get; }
        string LookupCollectionName { get; }
        string LocationCollectionName { get; }
        string DrugCollectionName { get; }
        string UserCollectionName { get; }
        string TenantCollectionName { get; }
        string MediaFileCollectioName { get; }
        string MedicationsCollectionName { get; }
        string TodoCollectionName { get; }
        string TicketCollectionName { get; }
    }
}
