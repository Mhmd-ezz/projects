using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Followup
    {
        public Followup()
        {
            CreatedOn = DateTime.Now;
            Type = "followup";
        }

        public string Type { get; }
        public string Location { get; set; }
        public DateTime? Date { get; set; }
        public List<string> Subjective { get; set; }
        public List<string> Medication { get; set; }
        public List<string> OtherTreatments { get; set; }
        public List<string> Assessment { get; set; }
        public List<string> Consultation { get; set; }
        public string PhysicalExam { get; set; }
        public string Laboratory { get; set; }
        public string Radio { get; set; }
        public string Note { get; set; }
        


        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
