using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.Infrastructure.Enums;
using System.Text.RegularExpressions;
using System;

namespace Medcilia.Clinic.Infrastructure.Repository.Patient
{
    public class ContactRepository : BaseRepository<Domain.Contact>, IContactRepository
    {
        public ContactRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            //var textIndexOptions = new CreateIndexOptions()
            //{
            //    Background = true,
            //    Collation = new Collation(
            //        "en",
            //        strength: CollationStrength.Secondary
            //        )
            //};

            //var fullText = new CreateIndexModel<Domain.Contact>(
            //Builders<Domain.Contact>.IndexKeys.Text(_ => _.Name), textIndexOptions);
            //Collection.Indexes.CreateOne(fullText);

            //var builder = Builders<Contact>.IndexKeys.Combine(
            //     Builders<Contact>.IndexKeys.Text(f => f.Name),
            //     Builders<Contact>.IndexKeys.Text(f => f.Telephone),
            //     Builders<Contact>.IndexKeys.Text(f => f.Email),
            //     Builders<Contact>.IndexKeys.Text(f => f.City),
            //     Builders<Contact>.IndexKeys.Text(f => f.PatientInfo.FileNumber)
            //    );

            //UnitOfWork.Database.GetCollection<Contact>(UnitOfWork.ContactCollectionName).Indexes.CreateOneAsync(builder);
            
        }

        public override Domain.Contact Add(Domain.Contact entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.Contact Update(Domain.Contact entity)
        {
            entity.Modified = DomainTime.Now();

            var builder = Builders<Domain.Contact>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter = filter & builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public override Domain.Contact GetById(string id)
        {
            var query = BuildContactsQuery();

            return query.Where(x => x.Id == id).SingleOrDefault();
        }


        public async Task<PagedData<Domain.Contact>> Search(string text, string sortBy, bool descending, string tenantId, int page, int size)
        {
            //var builder = Builders<Domain.Contact>.Filter;
            //var filter = builder.Empty;

            var query = BuildContactsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = query.OrderBy(sortBy.ToTitleCase(), descending);
            }

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                //query = query.Where(x => x.Name.ToLower().Contains(text.ToLower())
                //        //|| x.FileNumber.Contains(text)
                //        );

                var pattern = "";
                var text_ = text.Trim();
                List<string> words = text_.Split(new char[0]).ToList();
                words.ForEach(word => {
                    pattern += $"(?=.*{word})";
                });
                var regex = new Regex(pattern, RegexOptions.IgnoreCase);
                query = query.Where(x => regex.IsMatch(x.Name) ||
                                         regex.IsMatch(x.Telephone) ||
                                         regex.IsMatch(x.Email) ||
                                         regex.IsMatch(x.PatientInfo.FileNumber) ||
                                         regex.IsMatch(x.PatientInfo.EmergancyContact) ||
                                         regex.IsMatch(x.City));

            }
            //if (!string.IsNullOrEmpty(text))
            //{
            //    // Full Text match
            //    // filter = filter & builder.Text(text);

            //    // partial text match
            //    filter = filter & builder.Regex(x => x.Name, new BsonRegularExpression(text, "i"));
            //}

            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                //.OrderByDescending(p=>p.LastSeen)
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.Contact>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        public async Task<PagedData<Domain.Contact>> SearchPatients(string text, string sortBy, bool descending, string tenantId, int page, int size)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildContactsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            //query = query.Where(q => q.ContactType == ContactTypeEnum.Patient);
            query = query.Where(q => q.ContactTypeKey == "patient");

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortBy == "referral")
                {
                    query = descending ? query.OrderBy(e => e.PatientInfo.Referral) : query.OrderByDescending(e => e.PatientInfo.Referral);
                }
                else if (sortBy == "grantor")
                {
                    query = descending ? query.OrderBy(e => e.PatientInfo.Grantors) : query.OrderByDescending(e => e.PatientInfo.Grantors);
                }
                else if (sortBy == "lastSeen")
                {
                    //query = descending ? query = query.OrderBy(e => e.PatientInfo.LastSeen) : query.OrderByDescending(e => e.PatientInfo.LastSeen);
                    query = descending ? query.OrderByDescending(e => e.PatientInfo.LastSeen)
                        : query = query.OrderBy(e => e.PatientInfo.LastSeen);
                }
                else if (sortBy == "entryDate")
                {
                    query = descending ? query = query.OrderBy(e => e.PatientInfo.EntryDate) : query.OrderByDescending(e => e.PatientInfo.EntryDate);
                }
                else
                {
                    query = query.OrderBy(sortBy.ToTitleCase(), descending);
                }
            }

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                var pattern = "";
                var text_ = text.Trim();
                List<string> words = text_.Split(new char[0]).ToList();
                words.ForEach(word => {
                    pattern += $"(?=.*{word})";
                });
                var regex = new Regex(pattern,RegexOptions.IgnoreCase);
                query = query.Where(x =>
                                         regex.IsMatch(x.Name) ||
                                         regex.IsMatch(x.Telephone) ||
                                         regex.IsMatch(x.Email) ||
                                         regex.IsMatch(x.PatientInfo.FileNumber) ||
                                         regex.IsMatch(x.PatientInfo.EmergancyContact) ||
                                         regex.IsMatch(x.City)) ;
            }

            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(x => x.TenantId.DocumentId == tenantId);
            }

            var totalTask = query.Count();
            var itemsTask = query
                //.OrderByDescending(p=>p.LastSeen)
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.Contact>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<Domain.Contact> BuildContactsQuery()
        {
            var contacts = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = contacts.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Contact()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Name = itemA.Name.ToLower(),
                    Telephone = itemA.Telephone,
                    ContactNumbers=itemA.ContactNumbers,
                    Gender = itemA.Gender,
                    BirthDate = itemA.BirthDate,
                    Occupation = itemA.Occupation,
                    Partner = itemA.Partner,
                    Country = itemA.Country,
                    City = itemA.City,
                    Email = itemA.Email,
                    ContactTypeKey = itemA.ContactTypeKey,
                    IsDuplicate = itemA.IsDuplicate,
                    PatientInfo = itemA.PatientInfo,
                    //EntryDate = itemA.EntryDate,
                    //Referral = itemA.Referral,
                    //EmergancyContact = itemA.EmergancyContact,
                    //FileNumber = itemA.FileNumber,
                    //IdentityNumber = itemA.IdentityNumber,
                    //Grantors = itemA.Grantors,
                    //MediaFiles = itemA.MediaFiles,
                    //Flags = itemA.Flags,
                    //TotalDigitizedData = itemA.TotalDigitizedData,
                    //LastSeen = itemA.LastSeen,
                    //Specialities = itemA.Specialities,
                    //MaritalStatusKey = itemA.MaritalStatusKey,
                    //BloodTypeKey = itemA.BloodTypeKey,
                });


            return innerJoinResult;
       }


    }
}
