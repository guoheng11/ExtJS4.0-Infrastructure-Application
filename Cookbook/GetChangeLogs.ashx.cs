using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetChangeLogs
    /// </summary>
    public class GetChangeLogs : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string filter = context.Request.Params.Get("project_id");

            IQueryable<ChangeLog> q = db.ChangeLogs.Where(a => a.project_id.Equals(int.Parse(filter)));
            return new PagedData(q.Select(a => new {a.changelog_id, a.user_name, a.date, a.description, a.time, a.tab}));
        }
    }
}