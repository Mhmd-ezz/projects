using System.Collections.Generic;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services;

namespace Medcilia.Clinic.Infrastructure.Repository.Patient
{
    public interface IContactRepository : IBaseRepository<Domain.Contact>
    {
        Task<PagedData<Domain.Contact>> Search(string text, string sortBy, bool descending, string tenantId, int page, int size);
        Task<PagedData<Domain.Contact>> SearchPatients(string text, string sortBy, bool descending, string tenantId, int page, int size);
    }
}
