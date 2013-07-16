using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveDeliveryFormat
    /// </summary>
    public class RemoveDeliveryFormat : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveDeliveryFormat.ashx without parameters");

            if (context.Request.Params.Get("format") == null)
                return new PagedData("Format is null");

            DeliveryFormat name = db.DeliveryFormats.Single(a => a.format.Equals(context.Request.Params.Get("format")));
            db.DeliveryFormats.DeleteOnSubmit(name);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}