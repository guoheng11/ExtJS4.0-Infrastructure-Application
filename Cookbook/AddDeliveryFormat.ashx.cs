using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddDeliveryFormat
    /// </summary>
    public class AddDeliveryFormat : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddDeliveryFormat.ashx without parameters");

            if (context.Request.Params.Get("format") == null)
                return new PagedData("Format is null");


            DeliveryFormat format = new DeliveryFormat();

            format.format = context.Request.Params.Get("format");
            db.DeliveryFormats.InsertOnSubmit(format);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}