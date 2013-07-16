using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddFaxForm
    /// </summary>
    public class AddFaxForm : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddFaxForm.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            FaxForm ff = new FaxForm();
            ff.name = context.Request.Params.Get("name");
            db.FaxForms.InsertOnSubmit(ff);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}