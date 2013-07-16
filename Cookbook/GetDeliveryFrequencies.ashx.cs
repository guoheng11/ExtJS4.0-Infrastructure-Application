using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetDeliveryFrequencies
    /// </summary>
    public class GetDeliveryFrequencies : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<DeliveryFrequency> q = db.DeliveryFrequencies;

            return new PagedData(q.Select(a => new { a.delivery_frequency_id, a.frequency }));
        }
    }
}