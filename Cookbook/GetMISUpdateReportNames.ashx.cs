using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISUpdateReportNames
    /// </summary>
    public class GetMISUpdateReportNames : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISUpdateReportName> q = db.MISUpdateReportNames;

            string filter = context.Request.Params.Get("mis_update_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_update_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_update_report_names_id, a.report_name }));
            }

            return new PagedData("GetMISUpdateReportNames expects an mis_update_id");
        }
    }
}