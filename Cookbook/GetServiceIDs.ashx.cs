using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetServiceIDs
    /// </summary>
    public class GetServiceIDs : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ServiceID> q = db.ServiceIDs;

            return new PagedData(q.Select(a => new { a.serviceid_id, a.name }));
        }
    }
}