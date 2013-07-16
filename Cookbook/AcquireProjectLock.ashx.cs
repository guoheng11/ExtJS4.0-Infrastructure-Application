using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AcquireProjectLock
    /// </summary>
    public class AcquireProjectLock : DatabaseHandler
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
                    //ah -- make sure the user is in the DB
                    if(!(db.Users.Count(a=>a.user_name.Equals(user_name)) > 0))
                    {
                        return new PagedData("AcquireProjectLock.ashx requires a valid user. Please ask Cookbook Admin to add you as a user.");
                    }

                    ProjectInformation pi = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));

                    if (!((bool)pi.locked)) //|| pi.user_name.Equals(user_name, StringComparison.OrdinalIgnoreCase))
                    {
                        //lock it
                        pi.locked = true;
                        pi.user_name = user_name;
                        pi.last_time = DateTime.Now.ToString();

                        //also update the timestamp on the Users table
                        User record = db.Users.Single(a => a.user_name.Equals(user_name));
                        record.last_time = DateTime.Now.ToString();

                        db.SubmitChanges();

                        return new PagedData("Project successfully acquired");
                    }

                    //ah - if last_time is null, let the user in
                    if (pi.last_time == null)
                    {
                        pi.locked = true;
                        pi.user_name = user_name;
                        pi.last_time = DateTime.Now.ToString();

                        //also update the timestamp on the Users table to reflect this acquisition
                        User record = db.Users.Single(a => a.user_name.Equals(user_name));
                        record.last_time = DateTime.Now.ToString();

                        db.SubmitChanges();

                        return new PagedData("Project successfully acquired");
                    }

                    //(smm) Check the last_time of the project.
                    //If the time span is greater than 65 seconds, then release the lock by giving it to the requester
                    if ((DateTime.Now - DateTime.Parse(pi.last_time)).TotalSeconds > 75)
                    {
                        pi.locked = true;
                        pi.user_name = user_name;
                        pi.last_time = DateTime.Now.ToString();

                        //also update the timestamp on the Users table to reflect this acquisition
                        User record = db.Users.Single(a => a.user_name.Equals(user_name));
                        record.last_time = DateTime.Now.ToString();

                        db.SubmitChanges();

                        return new PagedData("Project successfully acquired");
                    }

                    return new PagedData("Project is currently locked by " + pi.user_name);
                }

                return new PagedData("AcquireProjectLock.ashx requires a user_name");
            }

            return new PagedData("AcquireProjectLock.ashx requires a project_id");
        }
    }
}