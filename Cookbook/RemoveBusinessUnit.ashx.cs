using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveBusinessUnit
    /// </summary>
    public class RemoveBusinessUnit : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveBusinessUnit.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            BusinessUnit bu = db.BusinessUnits.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.BusinessUnits.DeleteOnSubmit(bu);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}