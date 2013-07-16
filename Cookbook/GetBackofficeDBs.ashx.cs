using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetBackofficeDBs
    /// </summary>
    public class GetBackofficeDBs : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<BackofficeDB> q = db.BackofficeDBs;

            return new PagedData(q.Select(a => new { a.backoffice_db_id, a.name }));
        }
    }
}