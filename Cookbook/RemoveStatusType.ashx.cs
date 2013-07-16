using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveStatusType
    /// </summary>
    public class RemoveStatusType : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveStatusType.ashx without parameters");

            if (context.Request.Params.Get("type") == null)
                return new PagedData("Type is null");

            StatusType contact = db.StatusTypes.Single(a => a.type.Equals(context.Request.Params.Get("type")));
            db.StatusTypes.DeleteOnSubmit(contact);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}