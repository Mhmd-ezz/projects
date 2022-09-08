using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Dates;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class GeneralCondition : Condition
    {

        public GeneralCondition()
        {
            Activities = new GeneralActivities();
            Medications = new List<Medication>();

            CheifComplaint = new DataPartition();
            PresentHistory = new DataPartition();
            Diagnosis = new DataPartition();
            DifferentialDiagnosis = new DataPartition();
            Consultation = new DataPartition();
            Medication = new DataPartition();
            OtherTreatments = new DataPartition();
            PhysicalExam = new DataPartition();
            Laboratory = new DataPartition();
            Radio = new DataPartition();
            Note = new DataPartition();

        }

        public DataPartition CheifComplaint { get; set; }
        public DataPartition PresentHistory { get; set; }
        public DataPartition Diagnosis { get; set; }
        public DataPartition DifferentialDiagnosis { get; set; }
        public DataPartition Consultation { get; set; }
        public DataPartition Medication { get; set; }
        public DataPartition OtherTreatments { get; set; }
        public DataPartition PhysicalExam { get; set; }
        public DataPartition Laboratory { get; set; }
        public DataPartition Radio { get; set; }
        public DataPartition Note { get; set; }
        public GeneralActivities Activities { get; set; }
        public List<Medication> Medications { get; set; }

    }
}
