using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Security.Principal;

namespace Cookbook
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DateTime lastCookbookUpdate = new DateTime(2014, 3, 1, 11, 00, 00, 00); 
            StringBuilder cstext2 = new StringBuilder();
            WindowsIdentity windowsID = WindowsIdentity.GetCurrent();
            CookDBDataContext db = new CookDBDataContext();
            DateTime returnedLastTimeDT = new DateTime();

            string returnedName = null;
            string returnedPermission = null;
            string returnedLastTime = null;
            bool useCache = true;
            string uname = windowsID.Name.Substring(6).Trim().ToLower();
            string dateCompare = null;

            int ind = uname.LastIndexOf('\\');
            if (ind != -1)
            {
                uname = uname.Substring(ind + 1);
            }

            if (db.Users.Count(a => a.user_name.ToLower().Equals(uname)) == 1)
            {
                if (db.Users.Single(a => a.user_name.Equals(uname)).last_time != null)
                {
                    returnedName = uname;
                    returnedPermission = db.Users.Single(a => a.user_name.Equals(uname)).permission_flag;
                    returnedLastTime = db.Users.Single(a => a.user_name.Equals(uname)).last_time;
                    returnedLastTimeDT = DateTime.Parse(returnedLastTime);
                    if (DateTime.Compare(returnedLastTimeDT, lastCookbookUpdate) < 0 || DateTime.Compare(returnedLastTimeDT, lastCookbookUpdate) == 0)
                    {
                        //returnedLastTimeDT is earlier than or equal to lastCookbookUpdate. we need to use disable caching.
                        useCache = true;
                        dateCompare = "User has not been logged in since the last update";
                    }
                    else
                    {
                        //they have logged in since the last update, and can use caching by setting disable caching to false.
                        useCache = false;
                        dateCompare = "User has been logged in since the last update";
                    }
                }
                else
                {
                    useCache = true;
                    dateCompare = "User last time not found in backend";
                }
            }
            else
            {
                useCache = true;
                dateCompare = "User not found in backend";
            }
            
            cstext2.Append("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n");
            cstext2.Append("<html>\n");
            cstext2.Append("<head>\n");
            cstext2.Append("<script type=\"text/javascript\">\n");
            cstext2.Append("var SERVER_windowsname = '" + windowsID.Name.ToString() + "';\n");
            cstext2.Append("var SERVER_username = '" + uname + "';\n");
            cstext2.Append("var SERVER_permission = '" + returnedPermission + "';\n");
            cstext2.Append("var SERVER_lasttime = '" + returnedLastTime + "';\n");
            cstext2.Append("var SERVER_lastupdate = '" + lastCookbookUpdate + "';\n");
            cstext2.Append("var SERVER_datecompare = '" + dateCompare + "';\n");
            cstext2.Append("var SERVER_usecaching = '" + useCache + "';\n");
            cstext2.Append("var SERVER_cacheCookieValue = '" + lastCookbookUpdate + "';\n");
            cstext2.Append("</script>");

            Response.Write(cstext2);
        }
    }
}