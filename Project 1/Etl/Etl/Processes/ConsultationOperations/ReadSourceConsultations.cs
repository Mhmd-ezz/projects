using Rhino.Etl.Core.ConventionOperations;

namespace Etl.Processes.ConsultationOperations
{
    public class ReadSourceConsultations : ConventionInputCommandOperation
    {
        public ReadSourceConsultations() : base("SourceDb")
        {
            Command = @"
        SELECT [Id]
      ,[CreatedDate]
      ,[ModifiedDate]
      ,[EntryDate]
      ,[Title]
      ,[Condition]
      ,[ChiefComplaint]
      ,[PresentHistory]
      ,[PhysicalExam]
      ,[DifferentialDiagnosis]
      ,[Lab]
      ,[Radiology]
      ,[Consultations]
      ,[Diagnosis]
      ,[Medication]
      ,[Surgery]
      ,[Recommendation]
      ,[Other]
      ,[AdditionalInformation]
      ,[PatientId]
      ,[DoctorId]
      ,[ClinicId]
      ,[IsDeleted]
  FROM [dbo].[Consultation]
   WHERE IsDeleted = 0";

        }
    }

}
