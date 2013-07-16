using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISUpdates
    /// </summary>
    public class GetMISUpdates : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISUpdate> q = db.MISUpdates;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                
                return new PagedData(q.Select(a => new { a.mis_update_id, a.description }));
            }

            return new PagedData("GetMISUpdates expects a project_id");
        }
    }
}