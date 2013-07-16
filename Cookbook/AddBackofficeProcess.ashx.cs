using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddBackofficeProcess
    /// </summary>
    public class AddBackofficeProcess : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddBackofficeProcess.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            BackofficeProcess bp = new BackofficeProcess();
            bp.name = context.Request.Params.Get("name");
            db.BackofficeProcesses.InsertOnSubmit(bp);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}