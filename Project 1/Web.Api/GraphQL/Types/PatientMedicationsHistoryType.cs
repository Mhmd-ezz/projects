using System.Collections.Generic;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.PatientMedications;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class PatientMedicationsHistoryType : ObjectGraphType<PatientMedicationsHistoryModel>
    {
        public PatientMedicationsHistoryType(IMedicationsRepository patientMedicationstRepository, IMapper mapper)
        {
            Name = "PatientMedicationsHistory";

           
            Field(h => h.StartDate, nullable: true, type: typeof(DateTimeGraphType)).Description("The start time of medication history.");
            Field(h => h.EndDate, nullable: true, type: typeof(DateTimeGraphType)).Description("The end time of medication history.");
            Field(h => h.Duration, nullable: true).Description("The duration of the medication.");
            Field(h => h.Frequency, nullable: true).Description("The frequency of the medication.");
            Field(h => h.note, nullable: true).Description("note of the medication.");
            Field(h => h.Status, nullable: true).Description("The status of medication.");
        }
    }
}
