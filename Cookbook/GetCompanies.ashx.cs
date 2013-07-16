using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetCompanies
    /// </summary>
    public class GetCompanies : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Company> q = db.Companies;

            string filter = context.Request.Params.Get("name");
            if (!isNull(filter))
            {
                q = q.Where(a => a.company_name.IndexOf(filter) != -1);
            }

            return new PagedData(q.Select(a => new { a.company_id, a.company_name }));
        }
    }
}