using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public  class GeneralOperation : Condition
    {
        public string Department { get; set; }
        public DataPartition Anesthesia { get; set; }
        public List<string> Code { get; set; }
        public DataPartition OperationType { get; set; }
        public DataPartition OperationPerformed { get; set; }
        public DataPartition OperationDiagnosis { get; set; }
        public DataPartition OperationPostDiagnosis { get; set; }
        public DataPartition OperationPreFindings { get; set; }
        public DataPartition OperationCategory { get; set; }
        public DataPartition PhysicalExam { get; set; }
        public DataPartition Surgeons { get; set; }
        public string OperationDetails { get; set; }

    }

}
