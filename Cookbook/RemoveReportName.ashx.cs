using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveReportName
    /// </summary>
    public class RemoveReportName : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveReportName.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            ReportName name = db.ReportNames.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.ReportNames.DeleteOnSubmit(name);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}