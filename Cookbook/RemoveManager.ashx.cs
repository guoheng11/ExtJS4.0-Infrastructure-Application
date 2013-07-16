using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveManager
    /// </summary>
    public class RemoveManager : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveManager.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            Manager mang = db.Managers.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.Managers.DeleteOnSubmit(mang);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}