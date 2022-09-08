using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public  class GeneralFollowup : Condition
    {
        public GeneralFollowup()
        {
            Medications = new List<Medication>();

            Assessment = new DataPartition();
            Subjective = new DataPartition();
            Diagnosis = new DataPartition();
            Consultation = new DataPartition();
            Medication = new DataPartition();
            OtherTreatments = new DataPartition();
            PhysicalExam = new DataPartition();
            Laboratory = new DataPartition();
            Radio = new DataPartition();
            Note = new DataPartition();

        }
        public DataPartition Subjective { get; set; }
        public DataPartition Medication { get; set; }
        public DataPartition OtherTreatments { get; set; }
        public DataPartition Diagnosis { get; set; }
        public DataPartition Assessment { get; set; }
        public DataPartition Consultation { get; set; }
        public DataPartition PhysicalExam { get; set; }
        public DataPartition Laboratory { get; set; }
        public DataPartition Radio { get; set; }
        public DataPartition Note { get; set; }
        public List<Medication> Medications { get; set; }

    }
}
