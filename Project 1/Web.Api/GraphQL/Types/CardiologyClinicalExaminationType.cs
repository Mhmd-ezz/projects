using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class CardiologyClinicalExaminationType : ObjectGraphType<CardiologyClinicalExaminationModel>
    {
        public CardiologyClinicalExaminationType()
        {
            Name = "CardiologyClinicalExamination";


            Field(h => h.Bp, nullable: true).Description("The examined Bp.");
            Field(h => h.Hr, nullable: true).Description("The examined Hr.");
            Field(h => h.Pulse, nullable: true).Description("The examined Pulse.");
            Field(h => h.PulseClassification, nullable: true).Description("The Classification of examined Pulse.");

                //Cardiac Ausculation
            Field(h => h.Sound, nullable: true).Description("The examined Sound of Cardiac Ausculation.");
            Field(h => h.Value, nullable: true).Description("The examined value of Cardiac Ausculation.");
            Field(h => h.Intensity, nullable: true).Description("The examined Intensity.");
            Field(h => h.PericardialFriction, nullable: true).Description("The examined Pericardial Friction.");

                //Lung Ausculation
            Field(h => h.LungAuscultation, nullable: true).Description("The examined Lung Auscultation.");

                //Extremities
            Field(h => h.Aspect, nullable: true).Description("The examined Extremities Aspect.");
            Field(h => h.Puls, nullable: true).Description("The examined Extremities Puls.");
        
            Field(h => h.RightSuperior, nullable: true).Description("");
            Field(h => h.RightTransverse, nullable: true).Description("");
            Field(h => h.RightInferior, nullable: true).Description("");
            Field(h => h.LeftSuperior, nullable: true).Description("");
            Field(h => h.LeftTransverse, nullable: true).Description("");
            Field(h => h.LeftInferior, nullable: true).Description("");

                //Neck
            Field(h => h.HepatoJugularReflux, nullable: true).Description("The examined Neck Hepato Jugular Reflux.");
            Field(h => h.NeckCarotidMurmur, nullable: true).Description("The examined Neck Carotid Murmur.");

                //Abdomen
            Field(h => h.Soft, nullable: true).Description("The examined Abdomen Soft.");
            Field(h => h.Tender, nullable: true).Description("The examined Abdomen Tender.");
            Field(h => h.Hepatomegaly, nullable: true).Description("The examined Abdomen Hepatomegaly.");
            Field(h => h.Ascites, nullable: true).Description("The examined Abdomen Ascites.");
        }
    }
}
