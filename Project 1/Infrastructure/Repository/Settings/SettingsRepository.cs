namespace Medcilia.Clinic.Infrastructure.Repository.Settings
{
    public class SettingsRepository : BaseRepository<Domain.Settings>, ISettingsRepository
    {
        public SettingsRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }

}
