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

namespace Medcilia.Clinic.Infrastructure.Repository.Tickets
{
    public class TicketRepository : BaseRepository<Domain.Ticket>, ITicketRepository
    {
        public TicketRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
    

        }

        public override Domain.Ticket Add(Domain.Ticket entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.Ticket Update(Domain.Ticket entity)
        {
            entity.Modified = DomainTime.Now();

            var builder = Builders<Domain.Ticket>.Filter;
            var filter = builder.Eq(s => s.Id, entity.Id);
            filter = filter & builder.Eq(s => s.TenantId, entity.TenantId);

            Collection.ReplaceOne(filter, entity);
            return entity;
        }

        public override Domain.Ticket GetById(string id)
        {
            var query = BuildTicketsQuery();

            return query.Where(x => x.Id == id).SingleOrDefault();
        }


        public async Task<PagedData<Domain.Ticket>> Search(string text, string sortBy, bool descending, string tenantId, int page, int size)
        {
            var query = BuildTicketsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = query.OrderBy(sortBy.ToTitleCase(), descending);
            }

            if (!string.IsNullOrEmpty(text))
            {
                query = query.Where(x => x.Subject.ToLower().Contains(text.ToLower()));


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

            return new PagedData<Domain.Ticket>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        public async Task<PagedData<Domain.Ticket>> SearchAll(string text, string sortBy, bool descending, int page, int size,string type)
        {
            var query = BuildTicketsQuery();

            if (page < 1) page = 1;
            if (size < 1) size = 10;
            var start = (page - 1) * size;

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = query.OrderBy(sortBy, descending);
            }

            if (!string.IsNullOrEmpty(text))
            {
                query = query.Where(x => x.Subject.ToLower().Contains(text.ToLower()));


            }
            if (!string.IsNullOrEmpty(type))
            {
                query = query.Where(x => x.Status==4);
            }
            else
            {
                query = query.Where(x => x.Status != 4);
            }
            //if (!string.IsNullOrEmpty(tenantId))
            //{
            //    query = query.Where(x => x.TenantId.DocumentId == tenantId);
            //}

            var totalTask = query.Count();
            var itemsTask = query
                //.OrderByDescending(p=>p.LastSeen)
                .Skip(start)
                .Take(size)
                .ToList();

            return new PagedData<Domain.Ticket>
            {
                Total = totalTask,
                Items = itemsTask
            };
        }

        private IQueryable<Domain.Ticket> BuildTicketsQuery()
        {
            var tickets = Collection.AsQueryable();
            var tenants = this.UnitOfWork.Database.GetCollection<Domain.Tenant>(this.UnitOfWork.TenantCollectionName).AsQueryable();

            var innerJoinResult = tickets.Join(tenants,   // inner join A and B
                itemA => itemA.TenantId.DocumentId,                      // from each itemA take the Id
                itemB => itemB.Id,                      // from each itemB take the Id
                (itemA, itemB) => new Domain.Ticket()                  // when they match make a new object
                {                                       // where you only select the properties you want
                    Id = itemA.Id,
                    CreatedOn = itemA.CreatedOn,
                    Modified = itemA.Modified,
                    TenantId = itemA.TenantId,
                    Tenant = itemB,
                    TicketNumber=itemA.TicketNumber,
                    Subject=itemA.Subject,
                    Details=itemA.Details,
                    AttachFile=itemA.AttachFile,
                    Status=itemA.Status,
                    Messages=itemA.Messages,
                    IsReadbyAdmin=itemA.IsReadbyAdmin,
                    IsReadbyClient = itemA.IsReadbyClient,
                });


            return innerJoinResult;
       }


    }
}
