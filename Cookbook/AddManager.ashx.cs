using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddManager
    /// </summary>
    public class AddManager : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddManager.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");


            Manager mang = new Manager();

            mang.name = context.Request.Params.Get("name");
            db.Managers.InsertOnSubmit(mang);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}