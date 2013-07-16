using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveConfigurationFile
    /// </summary>
    public class RemoveConfigurationFile : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveConfigurationFile.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            ConfigurationFile cf = db.ConfigurationFiles.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.ConfigurationFiles.DeleteOnSubmit(cf);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}