using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISNewReportName
    /// </summary>
    public class GetMISNewReportName : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISNewReportName> q = db.MISNewReportNames;

            string filter = context.Request.Params.Get("mis_new_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_new_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_new_report_name_id, a.mis_new_id, a.report_name }));
            }

            return new PagedData("GetMISNewReportName expects an mis_new_id");
        }
    }
}