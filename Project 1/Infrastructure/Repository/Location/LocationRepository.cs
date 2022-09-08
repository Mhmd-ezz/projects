using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Location
{
    public class LocationRepository : BaseRepository<Domain.Location>, ILocationRepository
    {
        public LocationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public override Domain.Location Add(Domain.Location entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.Location Update(Domain.Location entity)
        {
            entity.Modified = DomainTime.Now();

            return base.Update(entity);
        }

        public bool CanDelete(string id)
        {
            var patientCollection = UnitOfWork.Database.GetCollection<Domain.Contact>("Contacts");
            var builder = Builders<Domain.Contact>.Filter;

            var filter = builder.Or(
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Location.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Location.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.Location.Id", id)
                );

            var result = patientCollection.Find(filter).ToList();

            return result.Count > 0 ? false : true;

            //UnitOfWork.PatientRepository.AnyActivitiesByLocation("5c0d263d1380516f349e13f4");
            //builder.Eq(s => s.Name, "patientName")
            //builder.ElemMatch(p => p.PatientInfo.Specialities.General.Conditions,
            //condition => condition.Location.Id == id)
        }

        public bool CanDeleteSubLocation(string sublocation)
        {
            var patientCollection = UnitOfWork.Database.GetCollection<Domain.Contact>("Contacts");
            var builder = Builders<Domain.Contact>.Filter;

            var filter = builder.Or(
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.subLocation", sublocation),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.subLocation", sublocation),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.subLocation", sublocation)
                );

            var result = patientCollection.Find(filter).ToList();

            return result.Count > 0 ? false : true;

        }

        public Domain.Location GetByName(string name, string tenantId)
        {

            var query = BuildLocationsQuery();

            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var location = query.Where(x => x.Name.ToLower() == name.ToLower() ).FirstOrDefault(); 

            return location;

        }


        public async Task<PagedData<Domain.Location>> Search(string text, string tenantId, int page, int size)
        {
            var query = BuildLocationsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                query = query.Where(x => x.Name.ToLower().Contains(text.ToLower()) || x.Address.ToLower().Contains(text.ToLower()));
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.Location>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<Domain.Location> BuildLocationsQuery()
        {
            var locations = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = locations.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Location()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Name = itemA.Name,
                    Contact = itemA.Contact,
                    Type = itemA.Type,
                    Address = itemA.Address,
                    SubLocations= itemA.SubLocations

                });


            return innerJoinResult;
        }


    }
}
