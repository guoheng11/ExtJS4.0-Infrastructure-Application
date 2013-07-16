using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetDeliveryMethods
    /// </summary>
    public class GetDeliveryMethods : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<DeliveryMethod> q = db.DeliveryMethods;

            return new PagedData(q.Select(a => new { a.delivery_method_id, a.method }));
        }
    }
}