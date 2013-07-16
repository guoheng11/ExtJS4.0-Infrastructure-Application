using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetBackofficeWebServices
    /// </summary>
    public class GetBackofficeWebServices : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<BackofficeWebService> q = db.BackofficeWebServices;

            return new PagedData(q.Select(a => new { a.backoffice_webservice_id, a.name }));
        }
    }
}