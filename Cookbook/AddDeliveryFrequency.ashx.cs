using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddDeliveryFrequency
    /// </summary>
    public class AddDeliveryFrequency : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddDeliveryFrequency.ashx without parameters");

            if (context.Request.Params.Get("frequency") == null)
                return new PagedData("Frequency is null");


            DeliveryFrequency frequency = new DeliveryFrequency();

            frequency.frequency = context.Request.Params.Get("frequency");
            db.DeliveryFrequencies.InsertOnSubmit(frequency);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}