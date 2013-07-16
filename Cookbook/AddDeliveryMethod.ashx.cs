using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddDeliveryMethod
    /// </summary>
    public class AddDeliveryMethod : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddDeliveryMethod.ashx without parameters");

            if (context.Request.Params.Get("method") == null)
                return new PagedData("Method is null");


            DeliveryMethod method = new DeliveryMethod();

            method.method = context.Request.Params.Get("method");
            db.DeliveryMethods.InsertOnSubmit(method);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}