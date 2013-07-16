using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISNewReportName
    /// </summary>
    public class GetStagingFolders : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<StagingFolder> q = db.StagingFolders;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.project_id, a.staging_folder_id, a.is_buffet, a.notes, a.folder, a.type}));
            }

            return new PagedData("GetStagingFolders expects a project_id");
        }
    }
}