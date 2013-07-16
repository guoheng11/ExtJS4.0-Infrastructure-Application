using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetFaxForms
    /// </summary>
    public class GetFaxForms : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<FaxForm> q = db.FaxForms;

            return new PagedData(q.Select(a => new { a.fax_form_id, a.name }));
        }
    }
}