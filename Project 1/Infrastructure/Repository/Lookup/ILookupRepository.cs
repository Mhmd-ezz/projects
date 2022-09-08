using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure.Services;
using Medcilia.Clinic.Infrastructure.Services.Lookups;

namespace Medcilia.Clinic.Infrastructure.Repository.Lookup
{
    public interface ILookupRepository : IBaseRepository<LookUp>
    {
        LookUp GetByValue(string tenantId, string group, string value);
        LookUp GetByText(string tenantId, string group, string text);
        List<LookUp> GetByGroup(string tenantId, string group, bool filterPredefined = false);
        List<LookUp> GetByGroups(string tenantId, List<string> groups, bool filterPredefined = false);
        bool CanDelete(string id);

        PagedData<LookUp> SearchByGroup(string text, string groupKey, string tenantId, int page, int size, bool filterPredefined = false);

    }
}
