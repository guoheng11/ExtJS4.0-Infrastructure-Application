using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemovePlatform
    /// </summary>
    public class RemovePlatform : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemovePlatform.ashx without parameters");

            if (context.Request.Params.Get("platform") == null)
                return new PagedData("Platform is null");

            Platform plat = db.Platforms.Single(a => a.platform1.Equals(context.Request.Params.Get("platform")));
            db.Platforms.DeleteOnSubmit(plat);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}