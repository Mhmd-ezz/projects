using Cmd.Extenstions;
using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Enums;
using MongoDB.Bson;
using MongoDB.Driver;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using System;

namespace Etl.Processes.FollowupOperations
{
    public class JoinConsultationsFollowups : JoinOperation
    {
        private InsertLookup _insertLookup;
        private InsertDrug _insertDrug;
        public JoinConsultationsFollowups()
        {
            _insertLookup = new InsertLookup();
            _insertDrug = new InsertDrug();
        }
        // @ leftRow : Consultation Source
        // @ rightRow : Followup Source
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
                gneralFollowup.Opened =  rightRow["EntryDate"] == null ? DateTime.MinValue : (DateTime)rightRow["EntryDate"];
                gneralFollowup.Status = "active";
                gneralFollowup.Type = ConditionTypeEnum.Followup;
                gneralFollowup.Location = new MongoDBRef("Locations", "5cb41c215fe7400f206799f5");

                if (rightRow["Subjective"] != null)
                {
                    var split = rightRow["Subjective"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Subjective.Text.Add(_insertLookup.ResolveLookup("subjective", text));
                    }
                }

                if (rightRow["PhysicalExam"] != null)
                {
                    var split = rightRow["PhysicalExam"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.PhysicalExam.Text.Add(_insertLookup.ResolveLookup("physical_exam", text));
                    }
                }

                if (rightRow["Lab"] != null)
                {
                    var split = rightRow["Lab"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Laboratory.Text.Add(_insertLookup.ResolveLookup("laboratory", text));
                    }
                }

                if (rightRow["Radiology"] != null)
                {
                    var split = rightRow["Radiology"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Radio.Text.Add(_insertLookup.ResolveLookup("radio", text));
                    }
                }

                if (rightRow["Consultations"] != null)
                {
                    var split = rightRow["Consultations"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Consultation.Text.Add(_insertLookup.ResolveLookup("consultation", text));
                    }
                }

                if (rightRow["Assessment"] != null)
                {
                    var split = rightRow["Assessment"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Assessment.Text.Add(_insertLookup.ResolveLookup("assessment", text));
                    }
                }

                if (rightRow["Recommendation"] != null)
                {
                    var split = rightRow["Recommendation"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Note.Text.Add(_insertLookup.ResolveLookup("note", text));
                    }
                }

                if (rightRow["Surgery"] != null)
                {
                    var split = rightRow["Surgery"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.OtherTreatments.Text.Add(_insertLookup.ResolveLookup("note", text));
                    }
                }

                if (rightRow["Other"] != null)
                {
                    var split = rightRow["Other"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Note.Text.Add(_insertLookup.ResolveLookup("note", text));
                    }
                }

                if (rightRow["AdditionalInformation"] != null)
                {
                    var split = rightRow["AdditionalInformation"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        gneralFollowup.Note.Text.Add(_insertLookup.ResolveLookup("note", text));
                    }
                }

                // @ Medication is unnecessary 
                //if (rightRow["Medication"] != null)
                //{
                //    var split = rightRow["Medication"].Sanitize().Split('\n');
                //    foreach (string text in split)
                //    {
                //        var medication = new Medication();
                //        medication.Drug = _insertDrug.ResolveDrug(text);
                //        gneralFollowup.Medications.Add(medication);
                //    }
                //}


                row["@@followup"] = gneralFollowup;
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
