using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetEngines
    /// </summary>
    public class GetEngines : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Engine> q = db.Engines;

            return new PagedData(q.Select(a => new { a.engine_id, a.name }));
        }
    }
}