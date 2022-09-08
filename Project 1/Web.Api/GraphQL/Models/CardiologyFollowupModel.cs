using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public  class CardiologyFollowupModel : ConditionModel
    {
        public DataPartitionModel Subjective { get; set; }
        public DataPartitionModel Medication { get; set; }
        public DataPartitionModel OtherTreatments { get; set; }
        public DataPartitionModel Assessment { get; set; }
        public DataPartitionModel Consultation { get; set; }
        public DataPartitionModel Diagnosis { get; set; }
        public DataPartitionModel PhysicalExam { get; set; }
        public DataPartitionModel Laboratory { get; set; }
        public DataPartitionModel Radio { get; set; }
        public DataPartitionModel Note { get; set; }
        public MedicationModel[] Medications { get; set; }
        public CardiologyClinicalExaminationModel CardiologyClinicalExamination { get; set; }
    }
}
