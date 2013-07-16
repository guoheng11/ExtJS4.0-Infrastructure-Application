using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISNewDelivery
    /// </summary>
    public class GetMISNewDelivery : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISNewDelivery> q = db.MISNewDeliveries;

            string filter = context.Request.Params.Get("mis_new_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_new_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_new_delivery_id, a.mis_new_id, a.method, a.format, a.frequency }));
            }

            return new PagedData("GetMISNewDelivery expects an mis_new_id");
        }
    }
}