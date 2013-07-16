using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddServiceID
    /// </summary>
    public class AddServiceID : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddServiceID.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");


            ServiceID serviceID = new ServiceID();

            serviceID.name = context.Request.Params.Get("name");
            db.ServiceIDs.InsertOnSubmit(serviceID);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}