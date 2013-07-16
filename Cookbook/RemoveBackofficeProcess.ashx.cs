using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveBackofficeProcess
    /// </summary>
    public class RemoveBackofficeProcess : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveBackofficeProcess.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            BackofficeProcess bp = db.BackofficeProcesses.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.BackofficeProcesses.DeleteOnSubmit(bp);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}