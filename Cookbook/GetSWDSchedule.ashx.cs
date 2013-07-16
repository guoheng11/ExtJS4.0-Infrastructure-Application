using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetSWDSchedule
    /// </summary>
    public class GetSWDSchedule : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<SWDSchedule> q = db.SWDSchedules;
            IQueryable<ProjectInformation> pi = db.ProjectInformations;
            IQueryable<UatProdInstall> upi = db.UatProdInstalls;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                string target_production_date;
                string actual_production_date;

                try
                {
                    target_production_date = pi.Single(b => b.project_id == int.Parse(filter)).requested_prod_date;
                    actual_production_date = upi.Single(c => c.project_id == int.Parse(filter)).uat_date;
                }
                catch (Exception)
                {
                    target_production_date = "";
                    actual_production_date = "";
                }

                return new PagedData(q.Select(a => new
                {
                    a.swd_schedule_id,
                    a.project_id,
                    a.scheduled_vendor_start,
                    a.scheduled_vendor_complete,
                    a.actual_vendor_complete,
                    a.scheduled_docs_to_customer,
                    a.actual_docs_to_customer,
                    a.scheduled_docs_approval,
                    a.actual_docs_approval,
                    a.scheduled_tls_start,
                    a.scheduled_tls_complete,
                    a.actual_tls_complete,
                    a.scheduled_uat_delivery,
                    a.actual_uat_delivery,
                    a.comments,
                    a.scheduled_systems_start,
                    a.scheduled_systems_complete,
                    a.actual_systems_complete,
                    a.actual_dev_complete,
                    a.actual_qa_complete,
                    a.actual_scripts_loaded,
                    a.target_scripts_delivered,
                    a.target_scripts_ordered,
                    a.actual_ba_complete,
                    a.scheduled_ba_start,
                    a.scheduled_ba_complete,
                    a.tls_comments,
                    a.systems_comments,
                    a.billable_pm_hours,
                    target_production_date,
                    actual_production_date,
                    a.access_usan_comments,
                    a.qa_comments,
                    a.net_ops_comments,
                    a.scheduled_dev_start,
                    a.scheduled_dev_complete
                }));
            }
            else
            {
                return new PagedData(q.Select(p => new
                {
                    p.project_id,
                    p.scheduled_uat_delivery
                }));
            }

        }
    }
}