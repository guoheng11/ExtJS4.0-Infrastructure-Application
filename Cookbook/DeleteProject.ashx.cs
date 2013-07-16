using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace Cookbook
{
    /// <summary>
    /// Summary description for Heartbeat
    /// </summary>
    public class DeleteProject : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string user_name = context.Request.Params.Get("user_name");
            string project_id = context.Request.Params.Get("project_id");

            int currProjectMISNewID = db.MISNews.Single(a => a.project_id.Equals(project_id)).mis_new_id;
            int currProjectMISUpdatesID = db.MISUpdates.Single(a => a.project_id.Equals(project_id)).mis_update_id;



            return new PagedData("Deleted");
        }
    }
}