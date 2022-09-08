using Cmd.Extenstions;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Enums;
using MongoDB.Bson;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Etl.Processes.ImagesOperations
{
    public class JoinPatientsImages : JoinOperation
    {
        // @ leftRow: Resolved Source (image details, patient details, condition details )
        // @ rightRow: target patient
        protected override Row MergeRows(Row leftRow, Row rightRow)
        {
            Row row = leftRow.Clone();

            // @ if no target patient found
            if (rightRow.Count == 0)
            {
                row["isNew"] = null;
            }

            if (rightRow.Count > 0)
            {
                // @ Target patients Specialities
                var speciality = (Speciality)rightRow["Specialities"];

                // @ Find the condition that image is related to
                if (speciality != null)
                {
                    // @ Source condition keys
                    var sourceConditionCreatedDate = ((DateTime)leftRow["ConditionCreatedDate"]).ToUniversalTime();
                    var sourceConditionName = (string)leftRow["Condition"];

                    var index = speciality.General.Conditions.FindIndex(condition =>
                    {
                        if (sourceConditionCreatedDate == condition.CreatedOn.ToUniversalTime() && condition.Name.Sanitize() == sourceConditionName.Sanitize())
                            return true;

                        return false;
                    });

                    if (index >= 0)
                    {
                        var condition = speciality.General.Conditions[index];

                        var mediaFile = new MediaFile();
                        mediaFile.Id = ObjectId.GenerateNewId().ToString();
                        mediaFile.PatientId = (string)rightRow["Id"];
                        mediaFile.Name = (string)leftRow["ImageName"];
                        mediaFile.CreatedOn = (DateTime)leftRow["CreatedDate"];
                        mediaFile.Modified = (DateTime)leftRow["ModifiedDate"];
                        mediaFile.Type = "image/jpeg";
                        mediaFile.Speciality = "general";
                        mediaFile.ConditionId = condition.Id;

                        mediaFile.SystemTagging.Add(FileSystemTagsEnum.GeneralSpeciality);
                        mediaFile.SystemTagging.Add(FileSystemTagsEnum.Condition);

                        row["@@mediaFile"] = mediaFile;
                    }
                    else
                    {
                        // @ condition not found => no need to add media file
                        row["isNew"] = null;
                    }
                }
            }


            return row;
        }

        protected override void SetupJoinConditions()
        {
            LeftJoin
                .Left("key")
                .Right("key");
        }
    }
}
