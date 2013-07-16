using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddStagingFolder
    /// </summary>
    public class AddStagingFolder : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string type = context.Request.Params.Get("install_type");
                if (!isNull(type))
                {
                    StagingFolder record = new StagingFolder();
                    record.folder = "";
                    record.notes = "";
                    record.project_id = int.Parse(project_id);
                    //record.is_buffet = type.Equals(1) ? true : false;
                    record.type = type;
                    db.StagingFolders.InsertOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData(new { record.staging_folder_id });
                }

                return new PagedData("AddStagingFolder.ashx requires a type");
            }

            return new PagedData("AddStagingFolder.ashx requires a project_id");
        }
    }
}