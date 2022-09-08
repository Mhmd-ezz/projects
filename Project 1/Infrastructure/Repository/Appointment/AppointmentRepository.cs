using System.Collections.Generic;
using System.Threading.Tasks;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure.Services;
using MongoDB.Driver;
using Medcilia.Clinic.Common.Extensions;
using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Medcilia.Clinic.Infrastructure.Repository.Appointment
{
    public class AppointmentRepository : BaseRepository<Domain.Appointment>, IAppointmentRepository
    {
        public AppointmentRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public override Domain.Appointment Add(Domain.Appointment entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.Appointment Update(Domain.Appointment entity)
        {
            entity.Modified = DomainTime.Now();

            var builder = Builders<Domain.Appointment>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter = filter & builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public override Domain.Appointment GetById(string id)
        {
            var query = BuildAppointmentsQuery();

            return query.Where(x => x.Id == id).SingleOrDefault();
        }

        public async Task<PagedData<Domain.Appointment>> Search(DateTime startTime, DateTime endTime, string text, string sortBy, bool descending, string tenantId, int page, int size)
        {
            //TODO: Warning => Left outer joins are not supported yet.
            var query = BuildAppointmentsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            // @ Should not be deleted
            query = query.Where(x => x.DeletedOn == null);

            if (startTime != null)
            {   
                query = query.Where(a => a.StartTime >= startTime);
                query = query.Where(a => a.EndTime >= startTime);
            }

            if (endTime != null)
            {
                query = query.Where(a => a.StartTime <= endTime);
                query = query.Where(a => a.EndTime <= endTime);
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = query.OrderBy(sortBy.ToTitleCase(), descending);
            }

            if (!string.IsNullOrEmpty(text))
            {
                // partial text match
                //query = query.Where(x => x.Subject.ToLower().Contains(text.ToLower()));

                var pattern = "";
                var text_ = text.Trim();
                List<string> words = text_.Split(new char[0]).ToList();
                words.ForEach(word => {
                    pattern += $"(?=.*{word})";
                });
                var regex = new Regex(pattern, RegexOptions.IgnoreCase);

                query = query.Where(x => regex.IsMatch(x.Subject));

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

            return new PagedData<Domain.Appointment>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<Domain.Appointment> BuildAppointmentsQuery()
        {
            var appointments = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = appointments.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Appointment()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    Subject = itemA.Subject,
                    StartTime = itemA.StartTime,
                    EndTime = itemA.EndTime,
                    Reason = itemA.Reason,
                    Color = itemA.Color,
                    Note = itemA.Note,
                    Contact = itemA.Contact,
                    Location = itemA.Location,
                    IsBlock = itemA.IsBlock,
                    IsReadonly = itemA.IsReadonly,
                    IsAllDay = itemA.IsAllDay,
                    DeletedOn = itemA.DeletedOn,
                    ConditionId = itemA.ConditionId,
                    Speciality = itemA.Speciality,
                    StatusKey = itemA.StatusKey,
                    TypeKey = itemA.TypeKey
                    //Status = itemA.Status,
                    //Type = itemA.Type,
                });


            return innerJoinResult;
        }


    }
}
