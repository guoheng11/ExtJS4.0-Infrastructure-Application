using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetBackofficeProcesses
    /// </summary>
    public class GetBackofficeProcesses : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<BackofficeProcess> q = db.BackofficeProcesses;

            return new PagedData(q.Select(a => new { a.backoffice_process_id, a.name }));
        }
    }
}