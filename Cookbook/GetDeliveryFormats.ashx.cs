using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetDeliveryFormats
    /// </summary>
    public class GetDeliveryFormats : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<DeliveryFormat> q = db.DeliveryFormats;

            return new PagedData(q.Select(a => new { a.delivery_format_id, a.format }));
        }
    }
}