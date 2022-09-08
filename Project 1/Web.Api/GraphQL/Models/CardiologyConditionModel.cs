using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class CardiologyConditionModel : ConditionModel
    {
        public DataPartitionModel CheifComplaint { get; set; }
        public DataPartitionModel PresentHistory { get; set; }
        public DataPartitionModel Diagnosis { get; set; }
        public DataPartitionModel DifferentialDiagnosis { get; set; }
        public DataPartitionModel Consultation { get; set; }
        public DataPartitionModel Medication { get; set; }
        public DataPartitionModel OtherTreatments { get; set; }
        public DataPartitionModel PhysicalExam { get; set; }
        public DataPartitionModel Laboratory { get; set; }
        public DataPartitionModel Radio { get; set; }
        public DataPartitionModel Note { get; set; }
        public CardiologyActivitiesModel Activities { get; set; }
        public MedicationModel[] Medications { get; set; }

        //public ConditionOverviewModel ConditionOverview { get; set; }
        public CardiologyClinicalExaminationModel CardiologyClinicalExamination { get; set; }

        public double Height { get; set; }
        public double Weight { get; set; }
        public double Bmi { get; set; }

    }
}
