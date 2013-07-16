using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveFileXferUpload
    /// </summary>
    public class RemoveFileXferUpload : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveFileXferUpload.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            FileXferUpload file = db.FileXferUploads.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.FileXferUploads.DeleteOnSubmit(file);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}