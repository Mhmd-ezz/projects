using System.Linq;
using System.Threading.Tasks;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Repository.Tenant
{
    public class TenantRepository : BaseRepository<Domain.Tenant>, ITenantRepository
    {
        public TenantRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }


        public override Domain.Tenant Add(Domain.Tenant entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.Tenant Update(Domain.Tenant entity)
        {
            entity.Modified = DomainTime.Now();

            return base.Update(entity);
        }

        public override Domain.Tenant GetById(string id)
        {
            var query = Collection.AsQueryable();

            return query.Where(x => x.Id == id).SingleOrDefault();
        }

        public override void Delete(string id)
        {
            var query = Collection.AsQueryable();

             base.Delete(query.Where(x => x.Id == id).SingleOrDefault());
        }
        
        public async Task<PagedData<Domain.Tenant>> Search(string text, string sort, string order, int page, int size)
        {
            var query = Collection
                            .AsQueryable()
                                .AsQueryable();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.Contains(text));
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .OrderBy(sort, (order == "asc" ? false : true))
                .ToList();

            return new PagedData<Domain.Tenant>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

    }
}
