using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class CardiologyClinicalExaminationModel
    {
        public string Bp { get; set; }
        public string Hr { get; set; }
        public string Pulse { get; set; }
        public string PulseClassification { get; set; }

        //Cardiac Ausculation
        public string Sound { get; set; }
        public string Value { get; set; }
        public string Intensity { get; set; }
        public bool PericardialFriction { get; set; }

        //Lung Ausculation
        public string LungAuscultation { get; set; }

        //Extremities
        public string Aspect { get; set; }
        public bool Puls { get; set; }

        public bool RightSuperior { get; set; }
        public bool RightTransverse { get; set; }
        public bool RightInferior { get; set; }
        public bool LeftSuperior { get; set; }
        public bool LeftTransverse { get; set; }
        public bool LeftInferior { get; set; }

        //Neck
        public bool HepatoJugularReflux { get; set; }
        public string NeckCarotidMurmur { get; set; }

        //Abdomen
        public bool Soft { get; set; }
        public string Tender { get; set; }
        public bool Hepatomegaly { get; set; }
        public bool Ascites { get; set; }
    }
}
