using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveFaxForm
    /// </summary>
    public class RemoveFaxForm : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveFaxForm.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            FaxForm ff = db.FaxForms.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.FaxForms.DeleteOnSubmit(ff);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}