
using Medcilia.Clinic.Common.Dates;

namespace Medcilia.Clinic.Infrastructure.Repository.Subscription
{
    public class SubscriptionRepository : BaseRepository<Domain.Subscription>, ISubscriptionRepository
    {
        public SubscriptionRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public override Domain.Subscription Add(Domain.Subscription entity)
        {
            entity.CreatedOn = DomainTime.Now();
            entity.Modified = DomainTime.Now();

            return base.Add(entity);
        }

        public override Domain.Subscription Update(Domain.Subscription entity)
        {
            entity.Modified = DomainTime.Now();

            return base.Update(entity);
        }

    }

}
