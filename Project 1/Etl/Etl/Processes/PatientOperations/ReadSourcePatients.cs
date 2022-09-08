using Rhino.Etl.Core.ConventionOperations;

namespace Etl.Processes.PatientOperations
{
    public class ReadSourcePatients : ConventionInputCommandOperation
    {

        public ReadSourcePatients() : base("SourceDb")
        {
        Command = @"
        SELECT
        pat.[Id]
        ,pat.[CreatedDate]
        ,pat.[ModifiedDate]
        ,pat.[EntryDate]
        ,pat.[MartialStatus]
        ,pat.[InsuranceCompany]
        ,pat.[Occupation]
        ,pat.[FirstName]
        ,pat.[MiddelName]
        ,pat.[LastName]
        ,pat.[Birthday]
        ,pat.[BloodType]
        ,pat.[Gender]
        ,pat.[Mobile]
        ,pat.[Phone]
        ,pat.[Email]
        ,pat.[Country]
        ,pat.[City]
        ,pat.[Street]
        ,pat.[Referrer]
        ,pat.[AdditionalInformation]
        ,pat.[MedicalStatusId]
        ,pat.[IsDeleted]
        ,pat.[DoctorId]
        ,pat.[ClinicId]
        ,mdc.Allergies
        ,mdc.PastMedicalHistory
        ,mdc.PastMedication
        ,mdc.PresentMedication
        ,mdc.SurgicalHistory
        FROM [clinic].[dbo].[Patient] as pat
        INNER JOIN [clinic].[dbo].MedicalStatus as mdc
        ON pat.MedicalStatusId = mdc.Id
        ";
        }

        //  public ReadSourcePatients() : base("SourceDb")
        //  {
        //  Command = @"SELECT TOP 10 [Id] 
        //,[CreatedDate]
        //,[ModifiedDate]
        //,[EntryDate]
        //,[MartialStatus]
        //,[InsuranceCompany]
        //,[Occupation]
        //,[FirstName]
        //,[MiddelName]
        //,[LastName]
        //,[Birthday]
        //,[BloodType]
        //,[Gender]
        //,[Mobile]
        //,[Phone]
        //,[Email]
        //,[Country]
        //,[City]
        //,[Street]
        //,[Referrer]
        //,[AdditionalInformation]
        //,[MedicalStatusId]
        //,[IsDeleted]
        //,[DoctorId]
        //,[ClinicId]
        //,[rowguid]
        //  FROM [dbo].[Patient]
        //  WHERE IsDeleted = 0 AND Id = '73101B8E-052F-11E9-9574-1C666D935569' 
        //  ORDER BY CreatedDate;";
        //  }
    }
}
