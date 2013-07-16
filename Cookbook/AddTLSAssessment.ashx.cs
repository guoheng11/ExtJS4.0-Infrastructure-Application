using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    public class AddTLSAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string type = context.Request.Params.Get("type");
                string username = context.Request.Params.Get("user_name");
                string permission = context.Request.Params.Get("permission");

                if (!isNull(type))
                {
                    SWDAssessment record = new SWDAssessment();
                    record.project_id = int.Parse(project_id);
                    record.assessment_type_id = db.AssessmentTypes.Single(a => a.type.Equals(type)).assessment_type_id;
                    record.contact_id = db.Contacts.Single(a => a.name.Equals("Test Guy")).contact_id;
                    record.action = "";
                    record.booked_hours = "0";
                    record.hours = "0";
                    db.SWDAssessments.InsertOnSubmit(record);
                    db.SubmitChanges();

                    doChangeLogging(type, username, permission, project_id, db);

                    return new PagedData(new { record.swd_assessment_id, record.Contact.name });
                }

                return new PagedData("AddSWDAssessment.ashx requires a type");
            }

            return new PagedData("AddSWDAssessment.ashx requires a project_id");
        }

        public void doChangeLogging(string type, string username, string permission, string project_id, CookDBDataContext db)
        {
            //if (permission != "PM")
            //{
                ChangeLog newLog = new ChangeLog();
                newLog.project_id = Convert.ToInt32(project_id);
                newLog.time = DateTime.Now.ToShortTimeString();
                newLog.date = DateTime.Now.ToShortDateString();
                newLog.tab = "TLS";
                newLog.user_name = username;
                newLog.description = "New record added to " + type + ". ";
                db.ChangeLogs.InsertOnSubmit(newLog);
                db.SubmitChanges();
            //}
        }
    }
}