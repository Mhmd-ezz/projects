using Cmd.Extenstions;
using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson;
using MongoDB.Driver;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using System;
using System.Collections.Generic;

namespace Etl.Processes.ConsultationOperations
{
    public class JoinConsultations : JoinOperation
    {
        private InsertLookup _insertLookup;
        private InsertDrug _insertDrug;

        public JoinConsultations()
        {
            _insertLookup = new InsertLookup();
            _insertDrug = new InsertDrug();
        }
        // @ leftRow : Patient ( Contact )
        // @ rightRow : JoinConsultationsFollowups => source condition include @@followup
        protected override Row MergeRows(Row leftRow, Row rightRow)
        {          
            Row row = leftRow.Clone();

            // @ There is a condition
            if (rightRow["Condition"] != null)
            {
                var generalCondition = new GeneralCondition();

                generalCondition.Id = ObjectId.GenerateNewId().ToString();
                generalCondition.Name = rightRow["Condition"].Sanitize();
                generalCondition.CreatedOn = (DateTime)rightRow["CreatedDate"];
                generalCondition.Modified = (DateTime)rightRow["ModifiedDate"];
                generalCondition.Opened = (DateTime)rightRow["EntryDate"];
                generalCondition.Status = "active";
                generalCondition.Type = ConditionTypeEnum.NewCondition;
                generalCondition.Location = new MongoDBRef("Locations", "5cb41c215fe7400f206799f5");
                

                if (rightRow["ChiefComplaint"] != null)
                {
                    var split = rightRow["ChiefComplaint"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.CheifComplaint.Text.Add(_insertLookup.ResolveLookup("cheif_complaint", text));
                    }
                }

                if (rightRow["PresentHistory"] != null)
                {
                    var split = rightRow["PresentHistory"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.PresentHistory.Text.Add(_insertLookup.ResolveLookup("present_history", text));
                    }
                }

                if (rightRow["PhysicalExam"] != null)
                {
                    var split = rightRow["PhysicalExam"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.PhysicalExam.Text.Add(_insertLookup.ResolveLookup("physical_exam", text));
                    }
                }

                if (rightRow["DifferentialDiagnosis"] != null)
                {
                    var split = rightRow["DifferentialDiagnosis"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.DifferentialDiagnosis.Text.Add(_insertLookup.ResolveLookup("differential_diagnosis", text));
                    }
                }

                if (rightRow["Lab"] != null)
                {
                    var split = rightRow["Lab"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.Laboratory.Text.Add(_insertLookup.ResolveLookup("laboratory", text));
                    }
                }

                if (rightRow["Radiology"] != null)
                {
                    var split = rightRow["Radiology"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.Radio.Text.Add(_insertLookup.ResolveLookup("radio", text));
                    }
                }

                if (rightRow["Consultations"] != null)
                {
                    var split = rightRow["Consultations"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.Consultation.Text.Add(_insertLookup.ResolveLookup("consultation", text));
                    }
                }

                if (rightRow["Diagnosis"] != null)
                {
                    var split = rightRow["Diagnosis"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.Diagnosis.Text.Add(_insertLookup.ResolveLookup("diagnosis", text));
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
                //        generalCondition.Medications.Add(medication);
                //    }
                //}

                if (rightRow["Surgery"] != null)
                {
                    var split = rightRow["Surgery"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.OtherTreatments.Text.Add(_insertLookup.ResolveLookup("other_treatments", text));
                    }
                }

                if (rightRow["Recommendation"] != null)
                {
                    var split = rightRow["Recommendation"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.Note.Text.Add(_insertLookup.ResolveLookup("note", text));
                    }
                }

                if (rightRow["Other"] != null)
                {
                    var split = rightRow["Other"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.Note.Text.Add(_insertLookup.ResolveLookup("note", text));
                    }
                }

                if (rightRow["AdditionalInformation"] != null)
                {
                    var split = rightRow["AdditionalInformation"].Sanitize().Split('\n');
                    foreach (string text in split)
                    {
                        generalCondition.Note.Text.Add(_insertLookup.ResolveLookup("note", text));
                    }
                }


                // @ if followup found 
                if (rightRow["@@followup"] != null)
                {
                    if (generalCondition.Activities.Followups == null)
                        generalCondition.Activities.Followups = new List<GeneralFollowup>();

                    if (generalCondition.Activities.Operations == null)
                        generalCondition.Activities.Operations = new List<GeneralOperation>();

                    generalCondition.Activities.Followups.Add((GeneralFollowup)rightRow["@@followup"]);

                    row["@@followup"] = (GeneralFollowup)rightRow["@@followup"];

                }
                row["@@condition"] = generalCondition;
            }
            return row;
        }

        protected override void SetupJoinConditions()
        {
            LeftJoin
                .Left("Id")
                .Right("PatientId");
        }
    }
}
