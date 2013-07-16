using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveDeliveryMethod
    /// </summary>
    public class RemoveDeliveryMethod : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveDeliveryMethod.ashx without parameters");

            if (context.Request.Params.Get("method") == null)
                return new PagedData("Method is null");

            DeliveryMethod name = db.DeliveryMethods.Single(a => a.method.Equals(context.Request.Params.Get("method")));
            db.DeliveryMethods.DeleteOnSubmit(name);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}