using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddEngine
    /// </summary>
    public class AddEngine : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddEngine.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");


            Engine eng = new Engine();

            eng.name = context.Request.Params.Get("name");
            db.Engines.InsertOnSubmit(eng);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}