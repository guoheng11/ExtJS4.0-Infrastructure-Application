using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveFileXferDownload
    /// </summary>
    public class RemoveFileXferDownload : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveFileXferDownload.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            FileXferDownload file = db.FileXferDownloads.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.FileXferDownloads.DeleteOnSubmit(file);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}