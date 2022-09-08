using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Dates;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class CardiologyCondition : Condition
    {

        public CardiologyCondition()
        {
            Activities = new CardiologyActivities();
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

            //ConditionOverview = new ConditionOverview();
            CardiologyClinicalExamination = new CardiologyClinicalExamination();

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
        public CardiologyActivities Activities { get; set; }
        public List<Medication> Medications { get; set; }
        
        //public ConditionOverview ConditionOverview { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }

        public double Bmi { get; set; }

        public CardiologyClinicalExamination CardiologyClinicalExamination { get; set; }

    }
}
