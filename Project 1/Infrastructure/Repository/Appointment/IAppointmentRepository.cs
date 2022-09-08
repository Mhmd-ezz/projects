using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services;

namespace Medcilia.Clinic.Infrastructure.Repository.Appointment
{
    public interface IAppointmentRepository : IBaseRepository<Domain.Appointment>
    {
        Task<PagedData<Domain.Appointment>> Search(DateTime startTime, DateTime endTime, string text, string sortBy, bool descending, string tenantId, int page, int size);

    }
}
