using System.Collections.Generic;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class PatientType : ObjectGraphType<ContactModel>
    {
        public PatientType(IContactRepository contactRepository, IMapper mapper)
        {
            Name = "Patient";

            Field(h => h.Id, nullable: true).Description("The id of the patient.");
            Field(h => h.Name, nullable: true).Description("The name of the patient.");
            Field(h => h.Gender, nullable: true).Description("The sex of the patient.");
            Field(h => h.Telephone, nullable: true).Description("Telphone number of the patient.");
            Field(h => h.ContactNumbers, nullable: true).Description("Contact Numbers of the patient.");
            Field(h => h.BirthDate, nullable: true, type: typeof(DateTimeGraphType)).Description("The birthdate of the patient.");
            Field(h => h.Occupation, nullable: true).Description("The Occupation of the patient.");
            Field(h => h.Partner, nullable: true).Description("The Partner of the patient.");
            Field(h => h.Country, nullable: true).Description("The name of the patient.");
            Field(h => h.City, nullable: true).Description("The city of the patient.");
            Field(h => h.IdentityNumber, nullable: true).Description("The identity number (Identity card or passport) of the patient.");
            Field(h => h.Email, nullable: true).Description("The Country of the patient.");
            Field(h => h.CreatedOn, nullable: true).Description("Creation Date.");
            Field(h => h.Modified, nullable: true).Description("Modified Date.");
            Field(h => h.IsDuplicate, nullable: true).Description("Modified Date.");
            Field<PatientInfoType>("patientInfo", resolve: context => context.Source.PatientInfo);
        }
    }
}
