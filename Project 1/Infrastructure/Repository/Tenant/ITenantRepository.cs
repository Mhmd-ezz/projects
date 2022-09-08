using Medcilia.Clinic.Infrastructure.Services;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Tenant
{
    public interface ITenantRepository : IBaseRepository<Domain.Tenant>
    {
        Task<PagedData<Domain.Tenant>> Search(string text, string sort, string order, int page, int size);
    }
}
