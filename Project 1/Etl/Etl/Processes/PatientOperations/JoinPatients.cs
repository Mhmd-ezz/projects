using Cmd.Extenstions;
using Medcilia.Clinic.Infrastructure.Domain;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;

namespace Etl.Processes.PatientOperations
{
    public class JoinPatients : JoinOperation
    {
        // @ leftRow : JoinConsultations
        // @ rightRow : Target patients
        protected override Row MergeRows(Row leftRow, Row rightRow)
        {
            Row row = leftRow.Clone();
            //row["text"] = ((string)leftRow["location_name"]).Clean().Trim();

            if (rightRow["key"] == null)
            {
                row["isNew"] = true;
            }
            else
            {
                row["isNew"] = false;
                row["id"] = rightRow["id"];
                if (row["@@condition"] != null)
                {
                    // TODO 
                    // @ check if consultation exists by key [condition - create] 
                    var sourceCondition = (GeneralCondition)row["@@condition"];
                    var sourceConditionKey = sourceCondition.Name.Sanitize() + " " + sourceCondition.CreatedOn;

                    var specialities = (Speciality)rightRow["Specialities"];

                    // @ No Conditions
                    if (specialities.General.Conditions.Count == 0)
                    {
                        // @ add condition
                        specialities.General.Conditions.Add((GeneralCondition)row["@@condition"]);
                    }
                    else
                    {
                        // @ Check if condition exsits 
                        var conditionIndex = specialities.General.Conditions.FindIndex(condition_ =>
                        {
                            var conditionKey_ = (condition_.Name).Sanitize() + " " + condition_.CreatedOn.ToUniversalTime();
                            // @ condition already created
                            if (condition_.Name.Sanitize() == sourceCondition.Name.Sanitize() &&
                                condition_.CreatedOn.ToUniversalTime() == sourceCondition.CreatedOn.ToUniversalTime())
                                return true;
                            else return false;
                        });

                        // @ condition exists then if followup found in source append the it to the existing condition
                        if (conditionIndex >= 0)
                        {
                            if(sourceCondition.Activities.Followups.Count > 0)
                            specialities.General.Conditions[conditionIndex].Activities.Followups
                                .Add(sourceCondition.Activities.Followups[0]);
                        }
                        else // @ Condition not found
                        {
                            specialities.General.Conditions.Add((GeneralCondition)row["@@condition"]);
                        }
                    }

                    row["Specialities"] = specialities;
                }
                else
                {
                    row["Specialities"] = rightRow["Specialities"];
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
