using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Medcilia.Clinic.Infrastructure.Repository.AppSettings
{
    public class AppSettingsRepository : BaseRepository<AppSetting>, IAppSettingsRepository
    {
        public AppSettingsRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public AppSetting GetSingle()
        {
            //var filter = Builders<T>.Filter.Eq(s => s.Id, id);
            return Collection.AsQueryable()
                .OrderByDescending(l => l.ModifiedDate)
                .FirstOrDefault();
        }
    }

}
