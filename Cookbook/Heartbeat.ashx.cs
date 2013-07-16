using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for Heartbeat
    /// </summary>
    public class Heartbeat : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string user_name = context.Request.Params.Get("user_name");
            if (isNull(user_name))
            {
                return new PagedData("Heartbeat.ashx expects a user_name");
            }

            string project_id = context.Request.Params.Get("project_id");
            if (isNull(project_id))
            {
                return new PagedData("Heartbeat.ashx expects a project_id");
            }

            ProjectInformation pi = db.ProjectInformations.Single(a => a.project_id.Equals(project_id));
            pi.last_time = DateTime.Now.ToString();  //update the project with the current time

            User record = db.Users.Single(a => a.user_name.Equals(user_name));
            record.last_time = DateTime.Now.ToString();  //update record with the current time
            db.SubmitChanges();

            return new PagedData("Done");
        }

    }
}