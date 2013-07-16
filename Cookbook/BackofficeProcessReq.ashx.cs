using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for BackofficeProcessReq1
    /// </summary>
    public class BackofficeProcessReq1 : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<BackofficeProcessReq> q = db.BackofficeProcessReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                return new PagedData(q.Select(a => new { a.backoffice_process_req_id, a.@new, a.name, a.exe_file, a.config_file, a.notes }));
            }

            return new PagedData("GetBackofficeProcessRequirements expects a project_id");
        }
    }
}