using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Etl.Processes.Common
{
    public class Filter : AbstractOperation
    {
        public override IEnumerable<Row> Execute(IEnumerable<Row> rows)
        {
            foreach (Row row in rows)
            {
                if (Action == "insert" && row["isNew"] != null && (bool)row["isNew"] == true)
                {
                    row.Remove("isNew");
                    yield return row;
                }
                if (Action == "update" && row["isNew"] != null && (bool)row["isNew"] == false)
                {
                    row.Remove("isNew");
                    yield return row;
                }
                if (Action == "delete" && row["isDelete"] != null && (bool)row["isDelete"] == true)
                {
                    row.Remove("true");
                    yield return row;
                }
            }
        }

        public string Action { get; set; }
    }
}
