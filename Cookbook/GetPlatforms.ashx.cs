using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetPlatforms
    /// </summary>
    public class GetPlatforms : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Platform> q = db.Platforms;

            return new PagedData(q.Select(a => new { a.platform_id, a.platform1 }));
        }
    }
}