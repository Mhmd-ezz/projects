using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Location
{
    public interface ILocationRepository : IBaseRepository<Domain.Location>
    {
        bool CanDelete(string id);
        bool CanDeleteSubLocation(string sublocation);
        Task<PagedData<Domain.Location>> Search(string text, string tenantId, int page, int size);
        Domain.Location GetByName(string name, string tenantId);

    }
}
