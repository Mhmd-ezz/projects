using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Operation
    {
        public Operation()
        {
            CreatedOn = DateTime.Now;
            Type = "operation";
        }
        public string Type { get;  }
        public string Location { get; set; }
        public DateTime? Date { get; set; }
        public string OperationType { get; set; }
        public string OperationPerformed { get; set; }
        public string OperationDiagnosis { get; set; }
        public string OperationPostDiagnosis { get; set; }
        public string OperationPreDiagnosis { get; set; }
        public string OperationDetails { get; set; }

        //TODO : Add Media 

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
