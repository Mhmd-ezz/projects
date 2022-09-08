using Medcilia.Clinic.Infrastructure.Services;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.User
{
    public interface IUserRepository : IBaseRepository<Domain.User>
    {
        Task<PagedData<Domain.User>> Search(string text, string tenantId, int page, int size);
        Domain.User GetUserByTenantId(string tenantId, string userId);
        Domain.User GetUserByAltUserId(string tenantId, string userId);

        
    }
}
