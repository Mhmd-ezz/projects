using Medcilia.Clinic.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Drug
{
    public interface IDrugRepository : IBaseRepository<Domain.Drug>
    {
        Task<PagedData<Domain.Drug>> Search(string text, string tenantId, int page, int size);
        Domain.Drug GetByName(string name, string tenantId);
        bool CanDelete(string id);
    }
}
