using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class CardiologyMedicalHistoryInputType : InputObjectGraphType
    {
        public CardiologyMedicalHistoryInputType()
        {
            Name = "CardiologyMedicalHistoryInput";

            Field<MedicalHistoryAlertInputType>("alerts");
            Field<MedicalHistoryAlertInputType>("allergies");
            Field<MedicalHistoryAlertInputType>("familyHistory");
            Field<MedicalHistoryAlertInputType>("MedicalIssues");
            Field<MedicalHistoryAlertInputType>("cardioVascular");
            Field<MedicalHistoryAlertInputType>("gi");
            Field<MedicalHistoryAlertInputType>("endocrinology");
            Field<MedicalHistoryAlertInputType>("lungDiseases");
            Field<MedicalHistoryAlertInputType>("neurology");
            Field<MedicalHistoryAlertInputType>("physiomaticDisorder");
            Field<MedicalHistoryAlertInputType>("riskFactors");
            Field<MedicalHistoryMedicationInputType>("pastMedication");
            Field<MedicalHistoryMedicationInputType>("presentMedication");
            Field<CardiologyMedicalHistorySurgeryInputType>("surgicalHistory");

        }
    }
}
