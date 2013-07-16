using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveSystemsAssessment
    /// </summary>
    public class RemoveSystemsAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string assessment_id = context.Request.Params.Get("assessment_id");
                string username = context.Request.Params.Get("user_name");
                string permission = context.Request.Params.Get("permission");

                if (!isNull(assessment_id))
                {
                    SystemsAssessment record = db.SystemsAssessments.Single(a => a.systems_req_id.Equals(assessment_id));

                    doChangeLogging(assessment_id, username, permission, project_id, db, record);

                    db.SystemsAssessments.DeleteOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData("SystemsAssessment deleted");
                }

                return new PagedData("RemoveSystemsAssessment.ashx requires an assessment_id");
            }

            return new PagedData("RemoveSystemsAssessment.ashx requires a project_id");
        }

        public void doChangeLogging(string type, string username, string permission, string project_id, CookDBDataContext db, SystemsAssessment record)
        {
            //if (permission != "PM")
            //{
                ChangeLog newLog = new ChangeLog();
                newLog.project_id = Convert.ToInt32(project_id);
                newLog.time = DateTime.Now.ToShortTimeString();
                newLog.date = DateTime.Now.ToShortDateString();
                newLog.tab = "Systems";
                newLog.user_name = username;
                string description = (record.description == null || record.description == "") ? "(empty)" : record.description;
                string billed = (record.billed_hours == null || record.billed_hours == "") ? "(empty)" : record.billed_hours;
                string booked = (record.booked_hours == null || record.booked_hours == "") ? "(empty)" : record.booked_hours;
                string targetstart = (record.target_start == null || record.target_start == "") ? "(empty)" : record.target_start;
                string targetcomplete = (record.target_complete == null || record.target_complete == "") ? "(empty)" : record.target_complete;
                string scheduledstart = (record.scheduled_start == null || record.scheduled_start == "") ? "(empty)" : record.scheduled_start;
                string scheduledcomplete = (record.scheduled_complete == null || record.scheduled_complete == "") ? "(empty)" : record.scheduled_complete;
                string actualcomplete = (record.actual_complete == null || record.actual_complete == "") ? "(empty)" : record.actual_complete;
                newLog.description = "Existing record deleted from Systems Engineering Assessment: Name: " + record.Contact.name +
                    "; Description: " + description + "; Billed Hours: " + billed + "; Booked Hours: " + booked + "; Target Start: "+ targetstart + 
                    "; Target Complete: " + targetcomplete + "; Scheduled Start: " + scheduledstart + "; Scheduled Complete: " + scheduledcomplete + "; Actual Complete: " +
                    actualcomplete + ".";
                db.ChangeLogs.InsertOnSubmit(newLog);
                db.SubmitChanges();
            //}
        }
    }
}