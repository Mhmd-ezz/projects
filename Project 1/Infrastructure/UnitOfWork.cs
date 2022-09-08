using Medcilia.Clinic.Common;
using Medcilia.Clinic.Infrastructure.Repository.Appointment;
using Medcilia.Clinic.Infrastructure.Repository.AppSettings;
using Medcilia.Clinic.Infrastructure.Repository.Drug;
using Medcilia.Clinic.Infrastructure.Repository.Tag;
using Medcilia.Clinic.Infrastructure.Repository.Grantor;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.Infrastructure.Repository.Lookup;
using Medcilia.Clinic.Infrastructure.Repository.MediaFile;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.Infrastructure.Repository.Rota;
using Medcilia.Clinic.Infrastructure.Repository.Schedule;
using Medcilia.Clinic.Infrastructure.Repository.Settings;
using Medcilia.Clinic.Infrastructure.Repository.Subscription;
using Medcilia.Clinic.Infrastructure.Repository.Tenant;
using Medcilia.Clinic.Infrastructure.Repository.User;
using Medcilia.Clinic.Infrastructure.Services.Audit;
using Medcilia.Clinic.Infrastructure.Repository.PatientMedications;
using MongoDB.Driver;
using Medcilia.Clinic.Infrastructure.Repository.Todo;
using Medcilia.Clinic.Infrastructure.Repository.Tickets;

namespace Medcilia.Clinic.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(string connectionString)
            : this(new MongoUrl(connectionString))
        {
        }

        public UnitOfWork(MongoUrl url)
        {
            // CosmosDb 
            // mongodb://username:password@host:port/[database]?ssl=true

            Client = new MongoClient(url);
            Database = Client.GetDatabase(url.DatabaseName);
        }

        public IMongoClient Client { get; }

        public IMongoDatabase Database { get; }

        public IAppointmentRepository AppointmentRepository => new AppointmentRepository(this);
        public IScheduleRepository ScheduleRepository => new ScheduleRepository(this, IoC.Resolve<IAuditLog>());
        public IRotaRepository RotaRepository => new RotaRepository(this, IoC.Resolve<IAuditLog>());
        public ILocationRepository LocationRepository => new LocationRepository(this);
        public IGrantorRepository GrantorRepository => new GrantorRepository(this, IoC.Resolve<IAuditLog>());
        public ITagRepository TagRepository => new TagRepository(this, IoC.Resolve<IAuditLog>());
        public ITodoRepository TodoRepository => new TodoRepository(this, IoC.Resolve<IAuditLog>());
        public IContactRepository ContactRepository => new ContactRepository(this);
        public ISettingsRepository SettingsRepository => new SettingsRepository(this);
        public ISubscriptionRepository SubscriptionRepository => new SubscriptionRepository(this);
        public IDrugRepository DrugRepository => new DrugRepository(this);
        public ILookupRepository LookupRepository => new LookupRepository(this);
        public IAppSettingsRepository AppSettingsRepository => new AppSettingsRepository(this);
        public IUserRepository UserRepository => new UserRepository(this);
        public IMediaFileRepository MediaFileRepository => new MediaFileRepository(this);
        public IMedicationsRepository PatientMedicationsRepository => new MedicationsRepository(this);
        public ITenantRepository TenantRepository => new TenantRepository(this);

        public ITicketRepository TicketRepository => new TicketRepository(this);
        public string ScheduleCollectionName
        {
            get => "Schedule";
        }
        public string AppointmentCollectionName
        {
            get => "Appointments";
        }
        public string RotaCollectionName
        {
            get => "Rota";
        }
        public string ContactCollectionName
        {
            get => "Contacts";
        }
        public string GrantorCollectionName
        {
            get => "Grantors";
        }
        public string TagCollectionName
        {
            get => "Tags";
        }
        public string LookupCollectionName
        {
            get => "Lookups";
        }
        public string LocationCollectionName
        {
            get => "Locations";
        }
        public string DrugCollectionName
        {
            get => "Drugs";
        }
        public string UserCollectionName
        {
            get => "Users";
        }
        public string TenantCollectionName
        {
            get => "Tenants";
        }
        public string MediaFileCollectioName
        {
            get => "MediaFiles";
        }
        public string MedicationsCollectionName
        {
            get => "Medications";
        }
        public string TodoCollectionName
        {
            get => "Todos";
        }

        public string TicketCollectionName
        {
            get => "Tickets";
        }
    

    }
}
