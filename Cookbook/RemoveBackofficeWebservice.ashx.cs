using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveBackofficeWebservice
    /// </summary>
    public class RemoveBackofficeWebservice : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveBackofficeWebservice.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            BackofficeWebService bw = db.BackofficeWebServices.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.BackofficeWebServices.DeleteOnSubmit(bw);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}