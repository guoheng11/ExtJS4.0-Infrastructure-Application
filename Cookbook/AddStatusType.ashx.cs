using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddStatusType
    /// </summary>
    public class AddStatusType : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddStatusType.ashx without parameters");

            if (context.Request.Params.Get("type") == null)
                return new PagedData("Type is null");

            StatusType type = new StatusType();

            type.type = context.Request.Params.Get("type");
            db.StatusTypes.InsertOnSubmit(type);

            db.SubmitChanges();

            return new PagedData("");
        }
    }
}