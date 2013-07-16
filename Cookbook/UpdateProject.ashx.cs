using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for UpdateProject
    /// </summary>
    public class UpdateProject : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call UpdateProject.ashx without parameters");

            bool doSubmit = false;

            for (int i = 0; i < context.Request.Params.Count; i++)
            {
                if (context.Request.Params.GetKey(i) == "application")
                {
                    Application app = new Application();
                    app.base_name = context.Request.Params.Get(i);
                    app.name = app.base_name + ".APP";
                    db.Applications.InsertOnSubmit(app);

                    doSubmit = true;
                }
            }

            if (doSubmit)
                db.SubmitChanges();

            return new PagedData("");
        }
    }
}