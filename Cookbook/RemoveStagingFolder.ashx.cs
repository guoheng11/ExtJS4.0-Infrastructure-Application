using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveStagingFolder
    /// </summary>
    public class RemoveStagingFolder : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string staging_folder_id = context.Request.Params.Get("staging_folder_id");
                if (!isNull(staging_folder_id))
                {
                    StagingFolder record = db.StagingFolders.Single(a => a.staging_folder_id.Equals(staging_folder_id));
                    db.StagingFolders.DeleteOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData("Staging folder deleted");
                }

                return new PagedData("RemoveStagingFolder.ashx requires a staging_folder_id");
            }

            return new PagedData("RemoveStagingFolder.ashx requires a project_id");
        }
    }
}