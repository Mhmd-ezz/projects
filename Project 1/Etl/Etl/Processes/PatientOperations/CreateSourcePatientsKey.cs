using System.Collections.Generic;
using Cmd.Extenstions;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;

namespace Etl.Processes
{
    internal class CreateSourcePatientsKey : AbstractOperation
    {
        public override IEnumerable<Row> Execute(IEnumerable<Row> rows)
        {
            foreach (var row in rows)
            {
                // @ Mobile field in source is the primary field and used as key (rather than telephone)
                row["key"] = row["FirstName"].Sanitize() + " " + row["MiddelName"].Sanitize() + " " + row["LastName"].Sanitize() + " " + row["Mobile"];
                yield return row;
            }
        }
    }
}