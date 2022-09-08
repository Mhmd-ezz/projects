using Rhino.Etl.Core.ConventionOperations;

namespace Etl.Processes.ImagesOperations
{
    public class ReadSourceImages : ConventionInputCommandOperation
    {

        public ReadSourceImages() : base("SourceDb")
        {
            Command = @"
            SELECT   
            i.[Id]
            ,i.[CreatedDate] 
            ,i.[ModifiedDate]
            ,i.[ImageName]
            ,i.[FollowUp_Id]
            ,i.[Consultation_Id]
            ,i.[Operation_Id]
            ,p.FirstName
            ,p.Id as PatientId
            ,p.FirstName as FirstName
            ,p.MiddelName as MiddelName
            ,p.LastName as LastName
            ,p.Mobile as Mobile
            ,con.CreatedDate as ConditionCreatedDate
            ,con.Condition as Condition
    
            FROM [clinic].[dbo].[Images] as i
            inner JOIN [clinic].[dbo].Consultation as con ON con.Id = i.Consultation_Id
            inner JOIN [clinic].[dbo].Patient as p ON p.Id = con.PatientId

            ";
        }


    }
}
