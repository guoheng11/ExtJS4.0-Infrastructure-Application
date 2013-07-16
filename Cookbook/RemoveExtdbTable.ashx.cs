using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveExtdbTable
    /// </summary>
    public class RemoveExtdbTable : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveExtdbTable.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            ExtdbTable table = db.ExtdbTables.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.ExtdbTables.DeleteOnSubmit(table);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}