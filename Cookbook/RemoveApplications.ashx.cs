using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveApplications
    /// </summary>
    public class RemoveApplications : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveApplications.ashx without parameters");

            bool doSubmit = false;

            for (int i = 0; i < context.Request.Params.Count; i++)
            {
                if (context.Request.Params.GetKey(i) == "application")
                {
                    Application app = db.Applications.Single(a => a.base_name.Equals(context.Request.Params.Get(i)));
                    db.Applications.DeleteOnSubmit(app);
                    doSubmit = true;
                }
            }

            if (doSubmit)
                db.SubmitChanges();

            return new PagedData("");
        }
    }
}