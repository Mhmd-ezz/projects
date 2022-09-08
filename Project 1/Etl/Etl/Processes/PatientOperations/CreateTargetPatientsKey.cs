using System;
using System.Collections.Generic;
using Cmd.Extenstions;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;

namespace Etl.Processes
{
    internal class CreateTargetPatientsKey : AbstractOperation
    {
        public override IEnumerable<Row> Execute(IEnumerable<Row> rows)
        {
            foreach (var row in rows)
            {
                row["key"] = row["Name"].Sanitize() + " " + row["Telephone"];
                yield return row;
            }
        }
    }
}