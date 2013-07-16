using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveDeliveryFrequency
    /// </summary>
    public class RemoveDeliveryFrequency : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveDeliveryFrequency.ashx without parameters");

            if (context.Request.Params.Get("frequency") == null)
                return new PagedData("Frequency is null");

            DeliveryFrequency frequency = db.DeliveryFrequencies.Single(a => a.frequency.Equals(context.Request.Params.Get("frequency")));
            db.DeliveryFrequencies.DeleteOnSubmit(frequency);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}