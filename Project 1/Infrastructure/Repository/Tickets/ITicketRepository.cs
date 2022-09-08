using System.Collections.Generic;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services;

namespace Medcilia.Clinic.Infrastructure.Repository.Tickets
{
    public interface ITicketRepository : IBaseRepository<Domain.Ticket>
    {
        Task<PagedData<Domain.Ticket>> Search(string text, string sortBy, bool descending, string tenantId, int page, int size);
        Task<PagedData<Domain.Ticket>> SearchAll(string text, string sortBy, bool descending, int page, int size,string type);
    }
}
