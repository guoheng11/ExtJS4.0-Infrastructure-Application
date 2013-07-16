using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Cookbook
{
    public class CookbookTools
    {
        public static string CreateProjectLink(int project_id, bool html){
            string emailLink = WebConfigurationManager.AppSettings["email_link"].Trim();
            if (!(emailLink.EndsWith("/") || emailLink.EndsWith("\\")))
            {
                emailLink = emailLink + "/";
            }
            emailLink = emailLink + "index.html?open_project=" + project_id;

            if (html)
            {
                emailLink = "<a href=\"" + emailLink + "\">" + emailLink + "</a>";
            }
            return emailLink;

        }

        public static string CreateProjectLink(int project_id)
        {
            return CreateProjectLink(project_id, false);
        }
    }
}