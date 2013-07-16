using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveContact
    /// </summary>
    public class RemoveContact : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveContact.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");
            if (context.Request.Params.Get("email") == null)
                return new PagedData("Email is null");

            Contact contact = db.Contacts.Single(a => a.name.Equals(context.Request.Params.Get("name")) && a.email1.Equals(context.Request.Params.Get("email")));
            db.Contacts.DeleteOnSubmit(contact);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}