using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetReportNames
    /// </summary>
    public class GetReportNames : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ReportName> q = db.ReportNames;

            return new PagedData(q.Select(a => new { a.report_name_id, a.name }));
        }
    }
}