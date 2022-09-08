using Cmd.Extenstions;
using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using MongoDB.Bson;
using MongoDB.Driver;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using System;

namespace Etl.Processes.ImagesOperations
{
    public class JoinImages : JoinOperation
    {
        // @ leftRow : Source images 
        // @ rightRow : Target images
        protected override Row MergeRows(Row leftRow, Row rightRow)
        {
            Row row = leftRow.Clone();

            if (rightRow["ImageKey"] == null)
            {
                row["isNew"] = true;
            }
            else
            {
                row["isNew"] = false;
                row["id"] = rightRow["id"];
            }
            return row;
        }

        protected override void SetupJoinConditions()
        {
            LeftJoin
                .Left("imageKey")
                .Right("imageKey");
        }
    }
}
