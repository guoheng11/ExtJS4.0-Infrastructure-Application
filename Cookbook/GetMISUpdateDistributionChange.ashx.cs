using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISUpdateDistributionChange
    /// </summary>
    public class GetMISUpdateDistributionChange : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISUpdateDistributionChange> q = db.MISUpdateDistributionChanges;

            string filter = context.Request.Params.Get("mis_update_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_update_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_update_id, a.Contact.email1, a.add_or_delete }));
            }

            return new PagedData("GetMISUpdateDistributionChange expects an mis_update_id");
        }
    }
}