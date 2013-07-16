using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetTransmissionTimeframes
    /// </summary>
    public class GetTransmissionTimeframes : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<TransmissionTimeframe> q = db.TransmissionTimeframes;

            return new PagedData(q.Select(a => new { a.transmission_timeframe_id, a.name }));
        }
    }
}