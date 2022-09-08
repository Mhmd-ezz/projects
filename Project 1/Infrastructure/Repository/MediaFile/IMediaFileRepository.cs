using Medcilia.Clinic.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Repository.MediaFile
{
    public interface IMediaFileRepository : IBaseRepository<Domain.MediaFile>
    {
        Task<PagedData<Domain.MediaFile>> Search(string text, string tenantId, int page, int size);

        List<Domain.MediaFile> GetAll();
        List<Domain.MediaFile> GetAllDeleted();

        Task<PagedData<PatientMediaFiles>> SearchPatientsMediaFiles(string text, string patientId, string tenantId, int page, int size);
        Task<PagedData<Domain.MediaFile>> GetTenantPoolMediaFiles(string text, string tenantId, int page, int size);
        Task<PagedData<Domain.MediaFile>> SearchByPatientId(string text, string tenantId, string patientId, int page, int size);
        Task<PagedData<Domain.MediaFile>> SearchByActivity(string text, string tenantId, string patientId, string speciality, string conditionId, string activitType, string activityId, int page, int size);
        Task<PagedData<Domain.MediaFile>> GetMediaPoolByPatientId(string text, string tenantId, string patientId, int page, int size);
        Task<PagedData<Domain.MediaFile>> SearchTicketsMediaFiles(string text, string ticketNumber, int page, int size);

    }
}
