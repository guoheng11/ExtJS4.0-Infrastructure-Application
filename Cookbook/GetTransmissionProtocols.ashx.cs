using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetTransmissionProtocols
    /// </summary>
    public class GetTransmissionProtocols : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<TransmissionProtocol> q = db.TransmissionProtocols;

            return new PagedData(q.Select(a => new { a.transmission_protocol_id, a.name }));
        }
    }
}