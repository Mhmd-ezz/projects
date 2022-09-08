using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class CardiologyClinicalExaminationInputType : InputObjectGraphType
    {
        public CardiologyClinicalExaminationInputType()
        {
            Name = "CardiologyClinicalExaminationInput";

            Field<StringGraphType>("Bp");
            Field<StringGraphType>("Hr");
            Field<StringGraphType>("Pulse");
            Field<StringGraphType>("PulseClassification");

            //Cardiac Ausculation
            Field<StringGraphType>("Sound");
            Field<StringGraphType>("Value");
            Field<StringGraphType>("Intensity");
            Field<BooleanGraphType>("PericardialFriction");

            //Lung Ausculation
            Field<StringGraphType>("LungAuscultation");

            //Extremities
            Field<StringGraphType>("Aspect");
            Field<BooleanGraphType>("Puls");

            Field<BooleanGraphType>("RightSuperior");
            Field<BooleanGraphType>("RightInferior");
            Field<BooleanGraphType>("RightTransverse");
            Field<BooleanGraphType>("LeftTransverse");
            Field<BooleanGraphType>("LeftSuperior");
            Field<BooleanGraphType>("LeftInferior");

            //Neck
            Field<BooleanGraphType>("HepatoJugularReflux");
            Field<StringGraphType>("NeckCarotidMurmur");

            //Abdomen
            Field<BooleanGraphType>("Soft");
            Field<StringGraphType>("Tender");
            Field<BooleanGraphType>("Hepatomegaly");
            Field<BooleanGraphType>("Ascites");

        }
    }
}
