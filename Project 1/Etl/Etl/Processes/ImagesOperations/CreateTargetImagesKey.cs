using System;
using System.Collections.Generic;
using Cmd.Extenstions;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;

namespace Etl.Processes
{
    internal class CreateTargetImagesKey : AbstractOperation
    {
        public override IEnumerable<Row> Execute(IEnumerable<Row> rows)
        {
            foreach (var row in rows)
            {
                row["imageKey"] = row["Name"].Sanitize();
                yield return row;
            }
        }
    }
}