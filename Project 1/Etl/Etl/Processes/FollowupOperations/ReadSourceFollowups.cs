using Rhino.Etl.Core.ConventionOperations;

namespace Etl.Processes.FollowupOperations
{
    public class ReadSourceFollowups : ConventionInputCommandOperation
    {
        public ReadSourceFollowups() : base("SourceDb")
        {
            Command = @"
            SELECT [Id]
            ,[CreatedDate]
            ,[ModifiedDate]
            ,[EntryDate]
            ,[Title]
            ,[Condition]
            ,[Subjective]
            ,[PhysicalExam]
            ,[Lab]
            ,[Radiology]
            ,[Consultations]
            ,[Assessment]
            ,[Medication]
            ,[Recommendation]
            ,[Surgery]
            ,[Other]
            ,[AdditionalInformation]
            ,[ConsultationId]
            ,[ClinicId]
            ,[IsDeleted]
        
            FROM [dbo].[FollowUp]
            WHERE IsDeleted = 0
        ;";

        }
    }

}
