using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetManagers
    /// </summary>
    public class GetManagers : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Manager> q = db.Managers;

            return new PagedData(q.Select(a => new { a.manager_id, a.name }));
        }
    }
}