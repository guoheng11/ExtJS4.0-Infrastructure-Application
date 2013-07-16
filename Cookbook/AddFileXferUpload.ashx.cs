using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddFileXferUpload
    /// </summary>
    public class AddFileXferUpload : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddFileXferUpload.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            FileXferUpload file = new FileXferUpload();
            file.name = context.Request.Params.Get("name");
            db.FileXferUploads.InsertOnSubmit(file);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}