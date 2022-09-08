using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services;

namespace Medcilia.Clinic.Infrastructure.Repository.PatientMedications
{
    public interface IMedicationsRepository : IBaseRepository<Domain.PatientMedications>
    {
        Task<PagedData<Domain.PatientMedications>> Search(DateTime startTime, DateTime endTime, string sortBy, bool descending, string tenantId, int page, int size);
        Task<PagedData<Domain.PatientMedications>> SearchPatientMedications(string patientId, string tenantId);
        Task<PagedData<Domain.PatientMedications>> SearchPatientMedicationsByCondition(string patientId, string conditionId, string tenantId);
        Task<PagedData<Domain.PatientMedications>> SearchPatientMedicationsByFollowup(string patientId, string followupId, string tenantId);
        Domain.PatientMedications updateMedications(string patientId, string medicationId);
    }
}
