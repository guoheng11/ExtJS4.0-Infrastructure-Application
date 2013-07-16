using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddHardwareAssessment
    /// </summary>
    public class AddHardwareAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string username = context.Request.Params.Get("user_name");
                string permission = context.Request.Params.Get("permission");

                HardwareRequirement record = new HardwareRequirement();
                record.project_id = int.Parse(project_id);
                record.description = "";
                record.cost_per_item = "";
                record.total_item_cost = "";
                record.target_order_date = "";
                record.target_delivery = "";
                record.actual_order_date = "";
                record.actual_delivery_date = "";
                db.HardwareRequirements.InsertOnSubmit(record);
                db.SubmitChanges();

                doChangeLogging(username, permission, project_id, db);

                return new PagedData(new { record.hardware_req_id });
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
                newLog.description = "New record added to Hardware Requirements.";
                db.ChangeLogs.InsertOnSubmit(newLog);
                db.SubmitChanges();
            //}
        }
    }
}