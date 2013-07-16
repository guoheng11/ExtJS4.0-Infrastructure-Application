using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddReportName
    /// </summary>
    public class AddReportName : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddReportName.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            
            ReportName name = new ReportName();

            name.name = context.Request.Params.Get("name");
            db.ReportNames.InsertOnSubmit(name);
            

            db.SubmitChanges();

            return new PagedData("");
        }
    }
}