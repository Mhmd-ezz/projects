using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class GeneralMedicalHistoryInputType : InputObjectGraphType
    {
        public GeneralMedicalHistoryInputType()
        {
            Name = "GeneralMedicalHistoryInput";

            Field<MedicalHistoryAlertInputType>("alerts");
            Field<MedicalHistoryAlertInputType>("allergies");
            Field<MedicalHistoryAlertInputType>("familyHistory");
            Field<MedicalHistoryAlertInputType>("MedicalIssues");
            Field<MedicalHistoryMedicationInputType>("pastMedication");
            Field<MedicalHistoryMedicationInputType>("presentMedication");
            Field<MedicalHistorySurgeryInputType>("surgicalHistory");

        }
    }
}
