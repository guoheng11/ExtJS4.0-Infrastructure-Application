using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    /// <summary>
    /// Summary description for UpdateSWDPage
    /// </summary>
    public class UpdateSWDPage : DatabaseHandler
    {
            String action = "";
            String name = "";
            String comment = "comments:";
            int contactNameId = 0;
            int assessmentTypeId = 0;

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            string systemsUpdates = context.Request.Params.Get("systems_updates");
            if (!isNull(filter))
            {
                if (!isNull(systemsUpdates))
                {
                    if (systemsUpdates.Contains('|'))
                    {
                        var existingSchedule = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                        existingSchedule.scheduled_systems_start = systemsUpdates.Substring(0, systemsUpdates.IndexOf('|'));
                        existingSchedule.scheduled_systems_complete = systemsUpdates.Substring(systemsUpdates.IndexOf('|') + 1);
                        db.SubmitChanges();
                        return new PagedData("Systems start/complete dates saved successfully - " + systemsUpdates.Substring(0, systemsUpdates.IndexOf('|')) + ":" + systemsUpdates.Substring(systemsUpdates.IndexOf('|') + 1));
                    }
                }

                /*
                 * Begin: SWD Schedule
                 * 
                 */

                try
                {
                    var existingSchedule = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    if ((string)blob["SWDSummaryScheduledVendorStart"] != null)
                    {
                        existingSchedule.scheduled_vendor_start = (string)blob["SWDSummaryScheduledVendorStart"];
                    }
                    if ((string)blob["SWDSummaryScheduledVendorComplete"] != null)
                    {
                        existingSchedule.scheduled_vendor_complete = (string)blob["SWDSummaryScheduledVendorComplete"];
                    }
                    if ((string)blob["SWDSummaryActualVendorComplete"] != null)
                    {
                        existingSchedule.actual_vendor_complete = (string)blob["SWDSummaryActualVendorComplete"];
                    }
                    if ((string)blob["SWDSummaryScheduledBAStart"] != null)
                    {
                        existingSchedule.scheduled_ba_start = (string)blob["SWDSummaryScheduledBAStart"];
                    }
                    if ((string)blob["SWDSummaryScheduledBAComplete"] != null)
                    {
                        existingSchedule.scheduled_ba_complete = (string)blob["SWDSummaryScheduledBAComplete"];
                    }
                    if ((string)blob["SWDSummaryActualBAComplete"] != null)
                    {
                        existingSchedule.actual_ba_complete = (string)blob["SWDSummaryActualBAComplete"];
                    }
                    if ((string)blob["SWDSummaryScheduledCFDocsToCustomer"] != null)
                    {
                        existingSchedule.scheduled_docs_to_customer = (string)blob["SWDSummaryScheduledCFDocsToCustomer"];
                    }
                    if ((string)blob["SWDSummaryScheduledCFDocsApproval"] != null)
                    {
                        existingSchedule.scheduled_docs_approval = (string)blob["SWDSummaryScheduledCFDocsApproval"];
                    }
                    if ((string)blob["SWDSummaryActualCFDocsToCustomer"] != null)
                    {
                        existingSchedule.actual_docs_to_customer = (string)blob["SWDSummaryActualCFDocsToCustomer"];
                    }
                    if ((string)blob["SWDSummaryActualCFDocsApproval"] != null)
                    {
                        existingSchedule.actual_docs_approval = (string)blob["SWDSummaryActualCFDocsApproval"];
                    }
                    if ((string)blob["SWDSummaryTargetScriptsOrdered"] != null)
                    {
                        existingSchedule.target_scripts_ordered = (string)blob["SWDSummaryTargetScriptsOrdered"];
                    }
                    if ((string)blob["SWDSummaryTargetScriptsDelivered"] != null)
                    {
                        existingSchedule.target_scripts_delivered = (string)blob["SWDSummaryTargetScriptsDelivered"];
                    }
                    if ((string)blob["SWDSummaryActualScriptsLoaded"] != null)
                    {
                        existingSchedule.actual_scripts_loaded = (string)blob["SWDSummaryActualScriptsLoaded"];
                    }
                    //dev
                    if ((string)blob["SWDSummaryScheduledDevStart"] != null)
                    {
                        existingSchedule.scheduled_dev_start = (string)blob["SWDSummaryScheduledDevStart"];
                    }
                    if ((string)blob["SWDSummaryScheduledDevComplete"] != null)
                    {
                        existingSchedule.scheduled_dev_complete = (string)blob["SWDSummaryScheduledDevComplete"];
                    }
                    if ((string)blob["SWDSummaryActualDevComplete"] != null)
                    {
                        existingSchedule.actual_dev_complete = (string)blob["SWDSummaryActualDevComplete"];
                    }
                    //qa
                    if ((string)blob["SWDSummaryActualQAComplete"] != null)
                    {
                        existingSchedule.actual_qa_complete = (string)blob["SWDSummaryActualQAComplete"];
                    }
                    if ((string)blob["SWDSummaryScheduledTLSSAASStart"] != null)
                    {
                        existingSchedule.scheduled_tls_start = (string)blob["SWDSummaryScheduledTLSSAASStart"];
                    }
                    if ((string)blob["SWDSummaryScheduledTLSSAASComplete"] != null)
                    {
                        existingSchedule.scheduled_tls_complete = (string)blob["SWDSummaryScheduledTLSSAASComplete"];
                    }
                    if ((string)blob["SWDSummaryActualTLSSAASComplete"] != null)
                    {
                        existingSchedule.actual_tls_complete = (string)blob["SWDSummaryActualTLSSAASComplete"];
                    }
                    if ((string)blob["SWDSummaryScheduledSystemsStart"] != null)
                    {
                        existingSchedule.scheduled_systems_start = (string)blob["SWDSummaryScheduledSystemsStart"];
                    }
                    if ((string)blob["SWDSummaryScheduledSystemsComplete"] != null)
                    {
                        existingSchedule.scheduled_systems_complete = (string)blob["SWDSummaryScheduledSystemsComplete"];
                    }
                    if ((string)blob["SWDSummaryActualSystemsComplete"] != null)
                    {
                        existingSchedule.actual_systems_complete = (string)blob["SWDSummaryActualSystemsComplete"];
                    }
                    if ((string)blob["SWDSummaryScheduledUATDelivery"] != null)
                    {
                        existingSchedule.scheduled_uat_delivery = (string)blob["SWDSummaryScheduledUATDelivery"];
                    }
                    if ((string)blob["SWDSummaryActualUATDelivery"] != null)
                    {
                        existingSchedule.actual_uat_delivery = (string)blob["SWDSummaryActualUATDelivery"];
                    }
                    if ((string)blob["SWDSummaryTargetProductionDate"] != null)
                    {
                        var existingProjInfo = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));
                        existingProjInfo.requested_prod_date = (string)blob["SWDSummaryTargetProductionDate"];
                    }
                    if ((string)blob["SWDSummaryActualProductionDate"] != null)
                    {
                        var existingUATInfo = db.UatProdInstalls.Single(a => a.project_id.Equals(int.Parse(filter)));
                        existingUATInfo.uat_date = (string)blob["SWDSummaryActualProductionDate"];
                    }


                    db.SubmitChanges();
                }
                catch (Exception e)
                {
                    comment += "[Exception in SWD Schedule Saving Module: " + e.Message + "]";
                }
                    /*
                     * Begin: PM Hours (added 6-12-12)
                     */
                if (blob["billablePMHours"] != null)
                {
                    if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var oldPMHours = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                        oldPMHours.billable_pm_hours = (string)blob["billablePMHours"];
                        db.SubmitChanges();
                    }
                }
                else
                {
                    if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var oldPMHours = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                        oldPMHours.billable_pm_hours = "0";
                        db.SubmitChanges();
                    }
                }




                /*
                 * Begin: Comments Area
                 */
                if (blob["swdCommentsArea"] != null)
                {
                    if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var oldComments = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                        oldComments.comments = (string)blob["swdCommentsArea"];
                        db.SubmitChanges();
                    }
                }
                else
                {
                    if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var oldComments = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                        oldComments.comments = "";
                        db.SubmitChanges();
                    }
                }
            }

            return new PagedData("success! " + comment);
        }











        public void updateSingleEntry(string assessmentType, CookDBDataContext db, int project_id, JObject blob, string type, bool allFields, bool onlyBilled)
        {
            try
            {                 
                SWDAssessment newRecord;  //smm = new SWDAssessment();
                newRecord = processProjectContact((string)blob[type + "Name"], assessmentType, db, project_id, (string)blob[type + "Notes"], int.Parse((string)blob[type + "AssessmentID"]));
                if (newRecord.contact_id != 0)
                {
                    if ((string)blob[type + "BilledHours"] != null && (string)blob[type + "BilledHours"] != "")
                    {
                        newRecord.hours = (string)blob[type + "BilledHours"];
                    }
                    if (!onlyBilled)
                    {
                        if ((string)blob[type + "BookedHours"] != null)
                        {
                            newRecord.booked_hours = (string)blob[type + "BookedHours"];
                        }
                    }
                    if (allFields)
                    {
                        if ((string)blob[type + "TargetStart"] != null)
                        {
                            newRecord.requested_start_date = (string)blob[type + "TargetStart"];
                        }
                        if ((string)blob[type + "TargetComplete"] != null)
                        {
                            newRecord.requested_complete = (string)blob[type + "TargetComplete"];
                        }
                        if ((string)blob[type + "ScheduledStart"] != null)
                        {
                            newRecord.scheduled_start_date = (string)blob[type + "ScheduledStart"];
                        }
                        if ((string)blob[type + "ScheduledComplete"] != null)
                        {
                            newRecord.scheduled_complete = (string)blob[type + "ScheduledComplete"];
                        }
                        if ((string)blob[type + "ActualComplete"] != null)
                        {
                            newRecord.actual_complete = (string)blob[type + "ActualComplete"];
                        }
                    }
                    //db.SWDAssessments.InsertOnSubmit(newRecord);   (smm - no insertion needed)
                    db.SubmitChanges();
                }
                else
                {
                    //contact not found in DB
                }
            }
            catch (Exception e)
            {
                comment += "[Error during updateSingleEntry " + assessmentType + ": " + e + "]";
            }
        }

        public void updateMultiEntry(string assessmentType, CookDBDataContext db, int project_id, JObject blob, string type, int numEntriesSumbitted, bool allFields, bool onlyBilled)
        {
            try
            {
                for (int i = 0; i < numEntriesSumbitted; i++)
                {
                    SWDAssessment newRecord;  //(smm) = new SWDAssessment();
                    newRecord = processProjectContact((string)blob[type + "Name"][i], assessmentType, db, project_id, (string)blob[type + "Notes"][i], int.Parse((string)blob[type + "AssessmentID"][i]));
                    if (newRecord.contact_id != 0)
                    {
                        if ((string)blob[type + "BilledHours"][i] != null && (string)blob[type + "BilledHours"][i] != "")
                        {
                            newRecord.hours = (string)blob[type + "BilledHours"][i];
                        }
                        if (!onlyBilled)
                        {
                            if ((string)blob[type + "BookedHours"][i] != null)
                            {
                                newRecord.booked_hours = (string)blob[type + "BookedHours"][i];
                            }
                        }
                        if (allFields)
                        {
                            if ((string)blob[type + "TargetStart"][i] != null)
                            {
                                newRecord.requested_start_date = (string)blob[type + "TargetStart"][i];
                            }
                            if ((string)blob[type + "TargetComplete"][i] != null)
                            {
                                newRecord.requested_complete = (string)blob[type + "TargetComplete"][i];
                            }
                            if ((string)blob[type + "ScheduledStart"][i] != null)
                            {
                                newRecord.scheduled_start_date = (string)blob[type + "ScheduledStart"][i];
                            }
                            if ((string)blob[type + "ScheduledComplete"][i] != null)
                            {
                                newRecord.scheduled_complete = (string)blob[type + "ScheduledComplete"][i];
                            }
                            if ((string)blob[type + "ActualComplete"][i] != null)
                            {
                                newRecord.actual_complete = (string)blob[type + "ActualComplete"][i];
                            }
                        }
                        //db.SWDAssessments.InsertOnSubmit(newRecord);  (smm - insertion not needed)
                    }
                    else
                    {
                        //contact not found in DB
                    }

                }
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                comment += "[Error during updateMultiEntry " + assessmentType + ": " + e + "]";
            }
        }

        public int getNumberOfEntriesSubmitted(string type, JObject blob)
        {
            try
            {
                //go through the name/notes/billed hours/booked hours to see how many records max they are.
                int maxRecords = 0;
                //NAME
                if (blob[type + "Name"] != null)
                {
                    if (blob[type + "Name"].GetType() == typeof(JValue))
                    {
                        maxRecords = 1;
                    }
                    else
                    {
                        maxRecords = blob[type + "Name"].Count();
                    }
                }
                //NOTES
                if (blob[type + "Notes"] != null)
                {
                    if (blob[type + "Notes"].GetType() == typeof(JValue))
                    {
                        maxRecords = maxRecords < 1 ? maxRecords = 1 : maxRecords;
                    }
                    else
                    {
                        maxRecords = maxRecords < blob[type + "Notes"].Count() ? maxRecords = blob[type + "Notes"].Count() : maxRecords;
                    }
                }
                //BILLED HOURS
                if (blob[type + "BilledHours"] != null)
                {
                    if (blob[type + "BilledHours"].GetType() == typeof(JValue))
                    {
                        maxRecords = maxRecords < 1 ? maxRecords = 1 : maxRecords;
                    }
                    else
                    {
                        maxRecords = maxRecords < blob[type + "BilledHours"].Count() ? maxRecords = blob[type + "BilledHours"].Count() : maxRecords;
                    }
                }
                //BOOKED HOURS
                if (blob[type + "BookedHours"] != null)
                {
                    if (blob[type + "BookedHours"].GetType() == typeof(JValue))
                    {
                        maxRecords = maxRecords < 1 ? maxRecords = 1 : maxRecords;
                    }
                    else
                    {
                        maxRecords = maxRecords < blob[type + "BookedHours"].Count() ? maxRecords = blob[type + "BookedHours"].Count() : maxRecords;
                    }
                }

                return maxRecords;
            }
            catch (Exception e)
            {
                comment += "[Something went wrong in getNumberOfEntries method: " + e.Message + "]";
                return 0;
            }
        }









        public void wipeOutAllRecords(string assessment_type, int project_id, CookDBDataContext db)
        {
            //get assessment type corresponding with type passed in
            assessmentTypeId = db.AssessmentTypes.Single(a => a.type.Equals(assessment_type)).assessment_type_id;

            var result = db.SWDAssessments.Where(a => a.project_id.Equals(project_id) && a.assessment_type_id == assessmentTypeId);
            db.SWDAssessments.DeleteAllOnSubmit(result);
            db.SubmitChanges();
        }

        //smm (added assessmentID to the parameters)
        public SWDAssessment processProjectContact(string contactNameBlob, string assessmentType, CookDBDataContext db, int project_id, string actionBlob, int assessmentID)
        {//this sets the name/action/assessment_type_id
            //ah 1-30-13 removed the parsing of action within contact name due to contacts now having parse the action out of the name, if it exists
            name = contactNameBlob;
            name = name.Trim();
            action = "";

            //check the newly added Notes field for an action there. If there is one present, overwrite the currently saved action
            if (actionBlob != null && actionBlob != "")
            {
                action = actionBlob.Trim();
            }

            //check for null name
            if (db.Contacts.Count(a => a.name.Equals(name)) > 0)
            {
                //get corresponding id of contact from contacts table
                contactNameId = db.Contacts.Single(a => a.name.Equals(name)).contact_id;

                //get assessment type corresponding with type passed in
                //*** smm (no longer needed since assessmentType is assigned in AddSWDAssessment.ashx) ***
                //assessmentTypeId = db.AssessmentTypes.Single(a => a.type.Equals(assessmentType)).assessment_type_id;

                //now add a new record with the name/action/assessment type
                SWDAssessment newRecord = db.SWDAssessments.Single(a => a.swd_assessment_id.Equals(assessmentID));  //(smm) new SWDAssessment();
                newRecord.contact_id = contactNameId;
                //newRecord.project_id = project_id;  (smm - not needed)
                if (action != "")
                {
                    newRecord.action = action;
                }
                //newRecord.assessment_type_id = assessmentTypeId;  (smm - not needed)
                return newRecord;
            }
            else
            {
                SWDAssessment newRecord = new SWDAssessment();
                return newRecord;
            }
        }
    }
}