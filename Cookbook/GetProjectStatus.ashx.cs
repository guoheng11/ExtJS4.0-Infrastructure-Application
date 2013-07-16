using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetProjectStatus
    /// </summary>
    public class GetProjectStatus : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectStatus> q = db.ProjectStatus;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                q = q.OrderByDescending(a => a.date);
                return new PagedData(q.Select(a => new { a.project_id, a.project_status_id, a.StatusType.type, a.date }));
            }
            else
            {
                q = q.OrderByDescending(a => a.date);
                return new PagedData(q.Select(a => new
                {
                    a.project_id,
                    a.date,
                    a.StatusType.type
                }));
            }
            //return new PagedData("GetProjectStatus expects a project_id");
        }
    }
}