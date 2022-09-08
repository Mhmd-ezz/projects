using Medcilia.Clinic.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Todo
{
    public interface ITodoRepository : IBaseRepository<Domain.Todo>
    {
        bool CanDelete(string id);
        Task<PagedData<Domain.Todo>> Search(string text, string tenantId, int page, int size, string patientId);
    }
}
