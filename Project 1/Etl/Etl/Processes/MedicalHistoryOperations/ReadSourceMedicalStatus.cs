using Rhino.Etl.Core.ConventionOperations;

namespace Etl.Processes.FollowupOperations
{
    public class ReadSourceMedicalStatus : ConventionInputCommandOperation
    {
        public ReadSourceMedicalStatus() : base("SourceDb")
        {
            Command = @"
     SELECT TOP  [Id]
      ,[CreatedDate]
      ,[ModifiedDate]
      ,[Allergies]
      ,[PastMedicalHistory]
      ,[SurgicalHistory]
      ,[PastMedication]
      ,[PresentMedication]
     FROM [clinic].[dbo].[MedicalStatus] 
        ;";

        }
    }

}
