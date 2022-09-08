using Medcilia.Clinic.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Tag
{
    public interface ITagRepository : IBaseRepository<Domain.Tag>
    {
        bool CanDelete(string id);
        Task<PagedData<Domain.Tag>> Search(string text, string tenantId, int page, int size);

    }
}
