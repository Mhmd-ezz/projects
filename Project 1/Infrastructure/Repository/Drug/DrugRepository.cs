using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Exceptions;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Drug
{
    public class DrugRepository : BaseRepository<Domain.Drug>, IDrugRepository
    {
        public DrugRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            CreateIndex();
        }

        public override Domain.Drug Add(Domain.Drug entity)
        {
            if (DuplicateExists(entity))
                throw new DuplicateEntryException("A duplicate drug already exists !");

            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            Guard.Against<MissingTenantException>(
                (entity.TenantId == null || string.IsNullOrEmpty(entity.TenantId.DocumentId)),
                "Failed to insert new Drug, missing required TenantId");

            return base.Add(entity);
        }

        public override Domain.Drug Update(Domain.Drug entity)
        {
            entity.Modified = DomainTime.Now();

            var builder = Builders<Domain.Drug>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter = filter & builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public Domain.Drug GetByName(string name, string tenantId)
        {
            var query = BuildDrugsQuery();

            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var drug = query.Where(x => x.Name.ToLower() == name.ToLower()).FirstOrDefault();

            return drug;

        }


        private bool DuplicateExists(Domain.Drug drug)
        {
            var builder = Builders<Domain.Drug>.Filter;
            var filter = builder.Empty;

            //filter = filter & builder.Eq(x => x.IsDeleted, false);

            filter = filter & builder.Ne(x => x.Id, drug.Id);
            filter = filter & builder.Eq(x => x.Name, drug.Name);
            filter = filter & builder.Eq(x => x.TenantId.DocumentId, drug.TenantId.DocumentId);

            return Collection.Find(filter).Any();
        }

        public async Task<PagedData<Domain.Drug>> Search(string text, string tenantId, int page, int size)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildDrugsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                //query = query.Where(x => x.Name.ToLower().Contains(text.ToLower())

                var pattern = "";
                var text_ = text.Trim();
                List<string> words = text_.Split(new char[0]).ToList();
                words.ForEach(word => {
                    pattern += $"(?=.*{word})";
                });
                var regex = new Regex(pattern, RegexOptions.IgnoreCase);

                query = query.Where(x => regex.IsMatch(x.Name));
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

            return new PagedData<Domain.Drug>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        public bool CanDelete(string id)
        {
            var patientCollection = UnitOfWork.Database.GetCollection<Domain.Contact>("Contacts");
            var builder = Builders<Domain.Contact>.Filter;

            var filter = builder.Or(

                // @ MedicalHistory
                builder.AnyEq("PatientInfo.Specialities.General.MedicalHistory.PastMedication.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.MedicalHistory.PresentMedication.Id", id),

                // @ Conditions
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Medications.Drug.Id", id),

                // @ Operations
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.Medications.Drug.Id", id),

                // @ Followups
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Medications.Drug.Id", id)

                );

            var result = patientCollection.Find(filter).ToList();

            return result.Count > 0 ? false : true;
        }


        private IQueryable<Domain.Drug> BuildDrugsQuery()
        {
            var drugs = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = drugs.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Drug()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Name = itemA.Name,
                    //Dosage = itemA.Dosage,
                    //Route = itemA.Route,
                    //Presentation = itemA.Presentation,
                    //Form = itemA.Form,
                    //Agent = itemA.Agent,
                    //AtcCode = itemA.AtcCode,
                    //Country = itemA.Country,
                    //Laboratory = itemA.Laboratory,
                    //Price = itemA.Price
                })
                .OrderBy(d => d.Name);


            return innerJoinResult;
        }
        private void CreateIndex()
        {
            var indexOptions = new CreateIndexOptions() { Background = true, Unique = true };
            var keys = Builders<Domain.Drug>.IndexKeys
                                            .Ascending(_ => _.TenantId)
                                            .Ascending(_ => _.Name)
                                            //.Ascending(_ => _.Dosage)
                                            //.Ascending(_ => _.Presentation)
                                            //.Ascending(_ => _.Form)
                                            ;
            var model = new CreateIndexModel<Domain.Drug>(keys, indexOptions);
            Collection.Indexes.CreateOne(model);
        }

    }
}
