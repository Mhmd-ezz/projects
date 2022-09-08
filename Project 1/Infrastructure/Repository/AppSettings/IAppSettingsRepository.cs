using Medcilia.Clinic.Infrastructure.Services;

namespace Medcilia.Clinic.Infrastructure.Repository.AppSettings
{
    public interface IAppSettingsRepository : IBaseRepository<AppSetting>
    {
        AppSetting GetSingle();
    }
}
