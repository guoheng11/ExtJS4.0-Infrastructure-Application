using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveEngine
    /// </summary>
    public class RemoveEngine : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveEngine.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            Engine eng = db.Engines.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.Engines.DeleteOnSubmit(eng);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}