using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.Schedule
{
    public interface IScheduleRepository : IBaseRepository<Domain.Schedule>
    {
        Domain.Schedule get( string tenantId);
    }
}
