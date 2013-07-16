using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetContactTypes
    /// </summary>
    public class GetContactTypes : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ContactType> q = db.ContactTypes;

            return new PagedData(q.Select(a => new { a.contact_type_id, a.type }));
        }
    }
}