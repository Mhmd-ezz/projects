using System.Collections.Generic;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;

namespace Etl.Processes
{
    internal class CreateSourceConsultationsKey : AbstractOperation
    {
        public override IEnumerable<Row> Execute(IEnumerable<Row> rows)
        {
            foreach (var row in rows)
            {
                row["key"] = row["PatientId"];
                yield return row;
            }
        }
    }
}