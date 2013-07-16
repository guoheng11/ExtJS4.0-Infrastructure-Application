using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddSystemsAssessment
    /// </summary>
    public class AddSystemsAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string username = context.Request.Params.Get("user_name");
                string permission = context.Request.Params.Get("permission");
                SystemsAssessment record = new SystemsAssessment();
                record.project_id = int.Parse(project_id);
                record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                record.description = "";
                record.billed_hours = "";
                record.booked_hours = "";
                record.target_start = "";
                record.target_complete = "";
                record.scheduled_start = "";
                record.scheduled_complete = "";
                record.actual_complete = "";
                db.SystemsAssessments.InsertOnSubmit(record);
                db.SubmitChanges();

                doChangeLogging(username, permission, project_id, db);

                return new PagedData(new { record.systems_req_id, record.Contact.name });
            }

            return new PagedData("AddSystemsAssessment.ashx requires a project_id");
        }

        public void doChangeLogging(string username, string permission, string project_id, CookDBDataContext db)
        {
            //if (permission != "PM")
            //{
                ChangeLog newLog = new ChangeLog();
                newLog.project_id = Convert.ToInt32(project_id);
                newLog.time = DateTime.Now.ToShortTimeString();
                newLog.date = DateTime.Now.ToShortDateString();
                newLog.tab = "Systems";
                newLog.user_name = username;
                newLog.description = "New record added to Systems Engineering Assessment.";
                db.ChangeLogs.InsertOnSubmit(newLog);
                db.SubmitChanges();
            //}
        }
    }
}