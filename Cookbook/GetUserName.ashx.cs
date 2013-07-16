using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    public class UserInfo
    {
        public string user_name;
        public string permission;
        public string lasttime;

        public UserInfo(string user, string prm)
        {
            user_name = user;
            permission = prm;
        }

        public UserInfo(string user, string prm, string lasttime)
        {
            user_name = user;
            permission = prm;
            this.lasttime = lasttime;
        }
    }

    /// <summary>
    /// Summary description for GetUserName
    /// </summary>
    public class GetUserName : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string uname = context.Request.ServerVariables["AUTH_USER"];
            int ind = uname.LastIndexOf('\\');
            if (ind != -1)
            {
                uname = uname.Substring(ind + 1);
            }

            //dip into the Users table and see what permissions are there
            if (db.Users.Count(a => a.user_name.Equals(uname)) == 1)
            {
                return new PagedData(new UserInfo(uname, db.Users.Single(a => a.user_name.Equals(uname)).permission_flag, db.Users.Single(a => a.user_name.Equals(uname)).last_time));
            }

            return new PagedData (new UserInfo(uname, "RDO"));
        }

    }
}