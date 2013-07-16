using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISNewDistribution
    /// </summary>
    public class GetMISNewDistribution : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISNewDistribution> q = db.MISNewDistributions;

            string filter = context.Request.Params.Get("mis_new_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_new_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_new_id, a.Contact.email1, a.add_or_delete }));
            }

            return new PagedData("GetMISNewDelivery expects an mis_new_id");
        }
    }
}