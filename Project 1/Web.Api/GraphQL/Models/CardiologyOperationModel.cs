using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public  class CardiologyOperationModel : ConditionModel
    {
        public string Department { get; set; }
        public DataPartitionModel Anesthesia { get; set; }
        public List<string> Code { get; set; }
        public DataPartitionModel OperationType { get; set; }
        public DataPartitionModel OperationPerformed { get; set; }
        public DataPartitionModel OperationDiagnosis { get; set; }
        public DataPartitionModel OperationPostDiagnosis { get; set; }
        public DataPartitionModel OperationPreFindings { get; set; }
        public DataPartitionModel OperationCategory { get; set; }
        public DataPartitionModel PhysicalExam { get; set; }
        public DataPartitionModel Surgeons { get; set; }
        public string OperationDetails { get; set; }
        public string FromNow { get; set; }
        public string FromLast { get; set; }

        //[BsonIgnore]
        //public string FromNow
        //{
        //    get { return "(5M,1W,4D)"; }
        //}
        //[BsonIgnore]
        //public string FromLast
        //{
        //    get { return "(2M,1W,4D)"; }
        //}

    }

}
