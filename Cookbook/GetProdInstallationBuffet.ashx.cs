using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetProdInstallationBuffet
    /// </summary>
    public class GetProdInstallationBuffet : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProdInstallationBuffet> q = db.ProdInstallationBuffets;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.prod_installation_buffet_id, a.project_id, a.date, a.conference_start, 
                a.conference_bridge, a.nodes, a.comments, a.prod_staging_folder, a.vxml_staging_folder, a.uat_staging_folder, a.post_maintenance_notification }));
            }

            return new PagedData("GetProdInstallationBuffet expects a project_id");
        }
    }
}