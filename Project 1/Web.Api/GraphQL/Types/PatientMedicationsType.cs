using System.Collections.Generic;
using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.PatientMedications;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.GraphQL.Models;


namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class PatientMedicationsType : ObjectGraphType<PatientMedicationsModel>
    {
        public PatientMedicationsType(IMedicationsRepository patientMedicationstRepository, IMapper mapper)
        {
            Name = "PatientMedications";

            Field(h => h.MedicationId, nullable: true).Description("The id of the medication.");
            Field(h => h.PatientId, nullable: true).Description("The id of patient.");
            Field(h => h.ConditionId, nullable: true).Description("The id of the condition.");
            Field(h => h.FollowupId, nullable: true).Description("The id of followup.");
            Field(h => h.StartTime, nullable: true, type: typeof(DateTimeGraphType)).Description("The start time of medication.");
            Field(h => h.EndTime, nullable: true, type: typeof(DateTimeGraphType)).Description("The end time of medication.");

            Field(h => h.Drug, nullable: true, type: typeof(DrugViewType)).Description("The drug of the appointment.");
            //Field(h => h.Drug, nullable: true).Description("The drug of medication.");
            Field(h => h.IsActive, nullable: true).Description("The status of medication.");
            Field(h => h.Reason, nullable: true).Description("");

            Field(h => h.History, nullable: true, type: typeof(ListGraphType<PatientMedicationsHistoryType>)).Description("The history of the appointment.");

            //Field<PatientMedicationsHistoryType>("PatientMedicationsHistory", resolve: context => context.Source.History);
        }
    }
}