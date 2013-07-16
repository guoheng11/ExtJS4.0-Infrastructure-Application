using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for ReleaseProjectLock
    /// </summary>
    public class ReleaseProjectLock : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectInformation> q = db.ProjectInformations;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                string user_name = context.Request.Params.Get("user_name");
                if (!isNull(user_name))
                {
                    ProjectInformation pi = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));

                    if (((bool)pi.locked) && pi.user_name.Equals(user_name, StringComparison.OrdinalIgnoreCase))
                    {
                        //unlock it
                        pi.locked = false;
                        pi.user_name = null;
                        db.SubmitChanges();

                        return new PagedData("Project successfully released");
                    }

                    return new PagedData("Project is currently unlocked.  Nothing to release");
                }

                return new PagedData("ReleaseProjectLock.ashx requires a user_name");
            }

            return new PagedData("ReleaseProjectLock.ashx requires a project_id");
        }
    }
}