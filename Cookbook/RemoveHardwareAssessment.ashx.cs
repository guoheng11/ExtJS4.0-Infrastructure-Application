using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveHardwareAssessment
    /// </summary>
    public class RemoveHardwareAssessment : DatabaseHandler
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
                    HardwareRequirement record = db.HardwareRequirements.Single(a => a.hardware_req_id.Equals(assessment_id));

                    doChangeLogging(assessment_id, username, permission, project_id, db, record);

                    db.HardwareRequirements.DeleteOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData("HardwareRequirement deleted");
                }

                return new PagedData("RemoveHardwareRequirement.ashx requires an assessment_id");
            }

            return new PagedData("RemoveHardwareRequirement.ashx requires a project_id");
        }

        public void doChangeLogging(string type, string username, string permission, string project_id, CookDBDataContext db, HardwareRequirement record)
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
                string costPerItem = (record.cost_per_item == null || record.cost_per_item == "") ? "(empty)" : record.cost_per_item;
                var quantity = (record.quantity == 0) ? 0 : record.quantity;
                string targetOrderDate = (record.target_order_date == null || record.target_order_date == "") ? "(empty)" : record.target_order_date;
                string targetDelivery = (record.target_delivery == null || record.target_delivery == "") ? "(empty)" : record.target_delivery;
                string actualOrderDate = (record.actual_order_date == null || record.actual_order_date == "") ? "(empty)" : record.actual_order_date;
                string actualDelivery = (record.actual_delivery_date == null || record.actual_delivery_date == "") ? "(empty)" : record.actual_delivery_date;
                newLog.description = "Existing record deleted from Hardware Requirements: Description: " + description +
                    "; Cost Per Item: " + costPerItem + "; Quantity: " + quantity+ "; Target Order Date: " + targetOrderDate + "; Target Delivery" + targetDelivery + 
                    "; Actual Order Date: " + actualOrderDate + "; Actual Delivery: " + actualDelivery + ".";
                db.ChangeLogs.InsertOnSubmit(newLog);
                db.SubmitChanges();
            //}
        }
    }
}