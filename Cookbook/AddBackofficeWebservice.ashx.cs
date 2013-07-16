using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddBackofficeWebservice
    /// </summary>
    public class AddBackofficeWebservice : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddBackofficeWebservice.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            BackofficeWebService bw = new BackofficeWebService();
            bw.name = context.Request.Params.Get("name");
            db.BackofficeWebServices.InsertOnSubmit(bw);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}