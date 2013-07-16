using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISUpdateDeliveryChanges
    /// </summary>
    public class GetMISUpdateDeliveryChanges : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISUpdateDeliveryChange> q = db.MISUpdateDeliveryChanges;

            string filter = context.Request.Params.Get("mis_update_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_update_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_update_delivery_change_id, a.method, a.format, a.frequency_id }));
            }

            return new PagedData("GetMISUpdateDeliveryChanges expects an mis_update_id");
        }
    }
}