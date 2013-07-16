using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetLinkedProjects
    /// </summary>
    public class GetLinkedProjects : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<LinkedProject> q = db.LinkedProjects;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                return new PagedData(q.Select(a => new { a.project_id, a.ProjectInformation1.project_number, a.associate_or_master, a.usan_ccr, a.ccr, a.maintenance_start }));
            }

            return new PagedData("GetLinkedProjects expects a project_id");
        }
    }
}