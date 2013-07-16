using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveSWDAssessment
    /// </summary>
    public class RemoveTLSAssessment : DatabaseHandler
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
                    SWDAssessment record = db.SWDAssessments.Single(a => a.swd_assessment_id.Equals(assessment_id));
                    
                    doChangeLogging(assessment_id, username, permission, project_id, db, record);

                    db.SWDAssessments.DeleteOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData("TLSAssessment deleted");
                }

                return new PagedData("RemoveTLSAssessment.ashx requires an assessment_id");
            }

            return new PagedData("RemoveTLSAssessment.ashx requires a project_id");
        }

        public void doChangeLogging(string type, string username, string permission, string project_id, CookDBDataContext db, SWDAssessment record)
        {
            //if (permission != "PM")
            //{
                ChangeLog newLog = new ChangeLog();
                newLog.project_id = Convert.ToInt32(project_id);
                newLog.time = DateTime.Now.ToShortTimeString();
                newLog.date = DateTime.Now.ToShortDateString();
                newLog.tab = "TLS";
                newLog.user_name = username;
                string action = (record.action == null || record.action == "") ? "(empty)" : record.action;
                string billed = (record.hours == null || record.hours == "") ? "(empty)" : record.hours;
                string booked = (record.booked_hours == null || record.booked_hours == "") ? "(empty)" : record.booked_hours;
                newLog.description = "Existing record deleted from " + record.AssessmentType.type + ": Name: " + record.Contact.name + 
                    "; Notes: " + action + "; Billed Hours: " + billed + "; Booked Hours: " + booked + ".";
                db.ChangeLogs.InsertOnSubmit(newLog);
                db.SubmitChanges();
            //}
        }
    }
}