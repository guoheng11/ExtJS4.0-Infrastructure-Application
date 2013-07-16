using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetStatusTypes
    /// </summary>
    public class GetStatusTypes : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<StatusType> q = db.StatusTypes;

            return new PagedData(q.Select(a => new { a.status_type_id, a.type }));
        }
    }
}