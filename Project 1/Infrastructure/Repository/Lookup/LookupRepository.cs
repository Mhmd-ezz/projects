using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.Infrastructure.Exceptions;
using Medcilia.Clinic.Infrastructure.Services;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure.Repository.Lookup
{
    public class LookupRepository : BaseRepository<LookUp>, ILookupRepository
    {
        public LookupRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            CreateIndex();
        }

        private void CreateIndex()
        {
            var indexOptions = new CreateIndexOptions() { Background = true, Unique = true };
            var keys = Builders<LookUp>.IndexKeys
                                            .Ascending(_ => _.TenantId)
                                            .Ascending(_ => _.GroupKey)
                                            .Ascending(_ => _.Text)
                                            ;
            var model = new CreateIndexModel<LookUp>(keys, indexOptions);
            Collection.Indexes.CreateOne(model);
        }

        public override LookUp Add(LookUp entity)
        {

            EnsureValid(entity);

            return base.Add(entity);
        }


        public override IEnumerable<LookUp> Add(IEnumerable<LookUp> entities)
        {
            foreach (var entity in entities)
            {
                EnsureValid(entity);
            }

            return base.Add(entities);
        }

        public override LookUp Update(LookUp entity)
        {
            entity.ModifiedDate = DomainTime.Now();

            var builder = Builders<LookUp>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);

            filter &= builder.Eq(s => s.TenantId, entity.TenantId);
            filter &= builder.Eq(s => s.GroupKey, entity.GroupKey);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public override void Delete(LookUp entity)
        {
            var builder = Builders<LookUp>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);

            filter &= builder.Eq(s => s.TenantId, entity.TenantId);
            filter &= builder.Eq(s => s.GroupKey, entity.GroupKey);

            Collection.DeleteOne(filter);
        }

        public override void Delete(string id)
        {
            var builder = Builders<LookUp>.Filter;
            var filter = builder.Eq(s => s.Id, id);
            var entity = Collection.Find(filter).SingleOrDefault();

            if (entity != null)
            {

                filter &= builder.Eq(s => s.GroupKey, entity.GroupKey);
                Collection.DeleteOne(filter);
            }
        }


        public LookUp GetByValue(string tenantId, string group, string value)
        {
            var builder = Builders<LookUp>.Filter;

            var filter = builder.Eq(s => s.TenantId.DocumentId, tenantId) &
                         builder.Eq(s => s.GroupKey, group) &
                         builder.Eq(s => s.Value, value);
            return Collection.Find(filter).FirstOrDefault();
        }


        public LookUp GetByText(string tenantId, string group, string text)
        {
            var builder = Builders<LookUp>.Filter;

            var filter = builder.Eq(s => s.TenantId.DocumentId, tenantId) &
                         builder.Eq(s => s.GroupKey, group) &
                         builder.Eq(s => s.Text, text);
            return Collection.Find(filter).FirstOrDefault();
        }

        public List<LookUp> GetByGroup(string tenantId, string @group, bool filterPredefined = false)
        {
            var builder = Builders<LookUp>.Filter;

            if (filterPredefined)
            {
                builder.Eq(s => s.Predefined, true);

            }
            var filter = builder.Eq(s => s.TenantId.DocumentId, tenantId) &
                         builder.Eq(s => s.GroupKey, group);


            return Collection.Find(filter).ToList();
        }

        public List<LookUp> GetByGroups(string tenantId, List<string> groups, bool filterPredefined = false)
        {
            var builder = Builders<LookUp>.Filter;

            if (filterPredefined)
            {
                builder.Eq(s => s.Predefined, true);
            }

            var filter = builder.Eq(s => s.TenantId.DocumentId, tenantId) &
                builder.In("GroupKey", groups);


            var lookups = Collection.Find(filter).ToList();

            //Todo : group by groupkey (working)
            //.GroupBy(p => p.GroupKey).ToDictionary(group => group.Key, group => group.ToList());

            return lookups;
        }


        public bool CanDelete(string id)
        {
            var patientCollection = UnitOfWork.Database.GetCollection<Domain.Contact>("Contacts");
            var builder = Builders<Domain.Contact>.Filter;

            // IMPORTANT: this is distributed into patches to avoid error thrown in Cosmos Db
            // 'The SQL query text exceeded the maximum limit of 262144 characters.'

            var filter1 = builder.Or(

                // @ Medical History
                builder.AnyEq("PatientInfo.Specialities.General.MedicalHistory.Allergies.Data.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.MedicalHistory.FamilyHistory.Data.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.MedicalHistory.MedicalIssues.Data.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.MedicalHistory.Allergies.Data.Id", id),

                // @ Conditions
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.CheifComplaint.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.PresentHistory.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Diagnosis.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.DifferentialDiagnosis.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Consultation.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.OtherTreatments.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.PhysicalExam.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Laboratory.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Radio.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Note.Text.Id", id)
                );
            var result1 = patientCollection.Find(filter1).CountDocuments();

            if (result1 > 0)
            {
                return false;
            }


            var filter2 = builder.Or(

                // @ Followups
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Subjective.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.OtherTreatments.Text.Id", id)

                );
            var result2 = patientCollection.Find(filter2).CountDocuments();
            if (result2 > 0)
            {
                return false;
            }

            var filter3 = builder.Or(

                // @ Followups
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Diagnosis.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Assessment.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Consultation.Text.Id", id)

            );
            var result3 = patientCollection.Find(filter3).CountDocuments();
            if (result3 > 0)
            {
                return false;
            }

            var filter4 = builder.Or(

                // @ Followups                
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.PhysicalExam.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Laboratory.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Radio.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Followups.Note.Text.Id", id)

            );
            var result4 = patientCollection.Find(filter4).CountDocuments();
            if (result4 > 0)
            {
                return false;
            }
            var filter5 = builder.Or(

                // @ Operations
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.Anesthesia.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.Code.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.OperationType.Text.Id", id)

                );

            var result5 = patientCollection.Find(filter5).CountDocuments();
            if (result5 > 0)
            {
                return false;
            }
            var filter6 = builder.Or(

                // @ Operations
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.OperationPerformed.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.OperationDiagnosis.Text.Id", id)
            );

            var result6 = patientCollection.Find(filter6).CountDocuments();
            if (result6 > 0)
            {
                return false;
            }
            var filter7 = builder.Or(

                // @ Operations
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.OperationPostDiagnosis.Text.Id", id),
                builder.AnyEq("PatientInfo.Specialities.General.Conditions.Activities.Operations.OperationPreFindings.Text.Id", id)
            );

            var result7 = patientCollection.Find(filter7).CountDocuments();
            return result7 > 0 ? false : true;
        }

        public PagedData<LookUp> SearchByGroup(string text, string groupKey, string tenantId, int page, int size, bool filterPredefined = false)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildLookUpsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (filterPredefined)
            {
                query = query.Where(x => x.Predefined.Equals(true));
            }

            if (!string.IsNullOrEmpty(groupKey))
            {
                query = query.Where(x => x.GroupKey.Equals(groupKey));
            }

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                //query = query.Where(x => x.Text.ToLower().Contains(text.ToLower()));

                var pattern = "";
                var text_ = text.Trim();
                List<string> words = text_.Split(new char[0]).ToList();
                words.ForEach(word =>
                {
                    pattern += $"(?=.*{word})";
                });
                var regex = new Regex(pattern, RegexOptions.IgnoreCase);

                query = query.Where(x => regex.IsMatch(x.Text));
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

            return new PagedData<LookUp>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<LookUp> BuildLookUpsQuery()
        {
            var lookups = Collection.AsQueryable();
            var tenants = UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = lookups.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new LookUp()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Text = itemA.Text,
                    Value = itemA.Value,
                    GroupKey = itemA.GroupKey,
                    Ancestors = itemA.Ancestors,
                    Children = itemA.Children,
                    CreatedDate = itemA.CreatedDate,
                    Culture = itemA.Culture,
                    CultureName = itemA.CultureName,
                    Description = itemA.Description,
                    ModifiedDate = itemA.ModifiedDate,
                    Order = itemA.Order,
                    Predefined = itemA.Predefined,
                    Parent = itemA.Parent,
                    ParentId = itemA.ParentId,
                    ParentValue = itemA.ParentValue,
                    Symbol = itemA.Symbol,
                    Visible = itemA.Visible,
                });



            return innerJoinResult;
        }
        private bool DuplicateExists(LookUp entity)
        {
            var builder = Builders<LookUp>.Filter;
            var filter = builder.Empty;

            //filter = filter & builder.Eq(x => x.IsDeleted, false);

            filter = filter & builder.Ne(x => x.Id, entity.Id);
            filter = filter & builder.Eq(x => x.TenantId.DocumentId, entity.TenantId.DocumentId);
            filter = filter & builder.Eq(x => x.GroupKey, entity.GroupKey);
            filter = filter & builder.Eq(x => x.Text, entity.Text);

            return Collection.Find(filter).Any();
        }
        private void EnsureValid(LookUp entity)
        {
            if (DuplicateExists(entity))
                throw new DuplicateEntryException("A duplicate lookup already exists !");

            entity.CreatedDate = DomainTime.Now();
            entity.ModifiedDate = DomainTime.Now();

            Guard.Against<MissingTenantException>(
                (entity.TenantId == null || string.IsNullOrEmpty(entity.TenantId.DocumentId)),
                "Failed to insert new lookup, missing required TenantId");
        }
    }
}
