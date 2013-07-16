using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddContact
    /// </summary>
    public class AddContact : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddContact.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");
            if (context.Request.Params.Get("company_name") == null)
                return new PagedData("Company is null");  
            if (context.Request.Params.Get("email") == null)
                return new PagedData("Email is null");

            Contact contact;
            bool insert = true;

            if (!isNull(context.Request.Params.Get("contact_id")))
            {
                contact = db.Contacts.Single(a => a.contact_id.Equals(context.Request.Params.Get("contact_id")));
                insert = false;
            }
            else
            {
                contact = new Contact();
            }


            Company company = db.Companies.Single(a => a.company_name.Equals(context.Request.Params.Get("company_name")));

            ContactType type = null;
            string strType = context.Request.Params.Get("type");

            if (strType != "")
            {
                type = db.ContactTypes.Single(a => a.type.Equals(strType));
                contact.ContactType = type;
            }
            else
            {
                contact.ContactType = null;
                contact.contact_type_id = null;
            }

            contact.name = context.Request.Params.Get("name");
            contact.email1 = context.Request.Params.Get("email");
            contact.Company = company;
            contact.title = context.Request.Params.Get("title");
            contact.phone = context.Request.Params.Get("phone");

            if (insert)
            {
                db.Contacts.InsertOnSubmit(contact);
            }

            db.SubmitChanges();

            return new PagedData("");
        }
    }
}