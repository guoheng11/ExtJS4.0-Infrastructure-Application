using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddPlatform
    /// </summary>
    public class AddPlatform : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddPlatform.ashx without parameters");

            if (context.Request.Params.Get("platform") == null)
                return new PagedData("Platform is null");

            Platform plat = new Platform();
            plat.platform1 = context.Request.Params.Get("platform");
            db.Platforms.InsertOnSubmit(plat);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}