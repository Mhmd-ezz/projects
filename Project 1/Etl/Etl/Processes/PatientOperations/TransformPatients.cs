using System;
using System.Collections.Generic;
using System.Linq;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Enums;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using Medcilia.Clinic.Common.Enumerations;


namespace Etl.Processes.PatientOperations
{
    public class TransformPatients : AbstractOperation
    {
        public override IEnumerable<Row> Execute(IEnumerable<Row> rows)
        {
            foreach (Row row in rows)
            {
                row["tenantId"] = "5c7d17ee7689122114953b99";
                yield return row;
            }
        }
    }

}
