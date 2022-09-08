using Cmd.Extenstions;
using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using MongoDB.Bson;
using MongoDB.Driver;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using System;

namespace Etl.Processes.FollowupOperations
{
    public class JoinPatientsMedicalHistory : JoinOperation
    {
        private InsertLookup _insertLookup;
        private InsertDrug _insertDrug;
        public JoinPatientsMedicalHistory()
        {
            _insertLookup = new InsertLookup();
            _insertDrug = new InsertDrug();
        }
        // @ leftRow : Consultation Source
        // @ rightRow : MedicalStatus Source
        protected override Row MergeRows(Row leftRow, Row rightRow)
        {
            Row row = leftRow.Clone();
        
            // @ Followup found
            if (rightRow["ConsultationId"] != null)
            {
                var gneralFollowup = new GeneralFollowup();

                gneralFollowup.Id = ObjectId.GenerateNewId().ToString();
                gneralFollowup.Name = rightRow["Title"].Sanitize();
                gneralFollowup.CreatedOn = rightRow["CreatedDate"] == null ? DateTime.MinValue : (DateTime)rightRow["CreatedDate"];
                gneralFollowup.Modified = rightRow["ModifiedDate"] == null ? DateTime.MinValue : (DateTime)rightRow["ModifiedDate"];
                gneralFollowup.Opened =  rightRow["EntryDate"] == null ? DateTime.MinValue : (DateTime)rightRow["EntryDate"]; ;
                gneralFollowup.Location = new MongoDBRef("Locations", "5cb41c215fe7400f206799f5");

                row["@@medicalStatus"] = gneralFollowup;
            }

            return row;
        }

        protected override void SetupJoinConditions()
        {
            LeftJoin
                .Left("Id")
                .Right("ConsultationId");
        }
    }
}
