using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetUatProdInstall
    /// </summary>
    public class GetUatProdInstall : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<UatProdInstall> q = db.UatProdInstalls;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new
                {
                    a.uat_prod_install_id,
                    a.uat_date,
                    a.uat_ccr,
                    a.uat_maintenance_start,
                    a.uat_conference_start,
                    a.uat_conference_bridge,
                    a.uat_node,
                    a.prod_date,
                    a.prod_ccr,
                    a.prod_maintenance_start,
                    a.prod_conference_start,
                    a.prod_conference_bridge,
                    a.prod_node,
                    a.cpz_date,
                    a.cpz_ccr,
                    a.cpz_maintenance_start,
                    a.cpz_conference_start,
                    a.cpz_conference_bridge,
                    a.cpz_node,
                    a.wor_date,
                    a.wor_ccr,
                    a.wor_maintenance_start,
                    a.wor_conference_start,
                    a.wor_conference_bridge,
                    a.wor_node,
                    a.scu_date,
                    a.scu_ccr,
                    a.scu_maintenance_start,
                    a.scu_conference_start,
                    a.scu_conference_bridge,
                    a.scu_node,
                    a.comments,
                    a.post_install_notification,
                    a.maintenance_type,
                    a.cpz_usan_ccr,
                    a.wor_usan_ccr,
                    a.scu_usan_ccr,
                    a.uat_usan_ccr,
                    a.prod_usan_ccr,
                    a.column1,
                    a.column2,
                    a.column3,
                    a.column4,
                    a.uat_install_date,
                    a.uat_install_node,
                    a.uat_install_comments,
                    a.prod_post_install_notification,
                    a.prod_install_comments
                }));
            }
            else
            {
                return new PagedData(q.Select(p => new
                {
                    p.project_id,
                    p.uat_date
                }));
            }

        }
    }
}