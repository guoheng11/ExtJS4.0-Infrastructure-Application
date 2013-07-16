using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetExtdbTables
    /// </summary>
    public class GetExtdbTables : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ExtdbTable> q = db.ExtdbTables;

            return new PagedData(q.Select(a => new { a.extdb_table_id, a.name, a.type }));
        }
    }
}