using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISUpdateDnis
    /// </summary>
    public class GetMISUpdateDnis : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISUpdateDNI> q = db.MISUpdateDNIs;

            string filter = context.Request.Params.Get("mis_update_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_update_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_updatednis_id, a.mis_update_id, a.dnis, a.route_to, a.remove_from, a.platform, a.description, a.effective_date, a.reroute_to, a.platform_from }));
            }

            return new PagedData("GetMISUpdateDnis expects an mis_update_id");
        }
    }
}