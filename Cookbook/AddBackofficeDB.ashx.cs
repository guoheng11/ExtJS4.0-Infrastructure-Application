using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddBackofficeDB
    /// </summary>
    public class AddBackofficeDB : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddBackofficeDB.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            BackofficeDB bdb = new BackofficeDB();
            bdb.name = context.Request.Params.Get("name");
            db.BackofficeDBs.InsertOnSubmit(bdb);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}