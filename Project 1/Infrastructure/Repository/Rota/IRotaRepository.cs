using Medcilia.Clinic.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Rota
{
    public interface IRotaRepository : IBaseRepository<Domain.Rota>
    {
        Task<PagedData<Domain.Rota>> Search(string text, string tenantId, int page, int size);
    }
}
