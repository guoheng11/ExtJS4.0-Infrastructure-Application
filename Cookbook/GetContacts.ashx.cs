using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetContacts
    /// </summary>
    public class GetContacts : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Contact> q = db.Contacts;
            return new PagedData(q.Select(a => new { a.contact_id, a.name, a.Company.company_name, a.ContactType.type, a.email1, a.email2, a.title, a.phone }));
        }
    }
}