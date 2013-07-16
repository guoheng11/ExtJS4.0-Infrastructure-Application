using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveBackofficeDB
    /// </summary>
    public class RemoveBackofficeDB : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveBackofficeDB.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            BackofficeDB bdb = db.BackofficeDBs.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.BackofficeDBs.DeleteOnSubmit(bdb);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}