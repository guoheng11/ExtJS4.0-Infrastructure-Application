using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISNew
    /// </summary>
    public class GetMISNew : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISNew> q = db.MISNews;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.mis_new_id, a.description, a.BusinessUnit.name, a.application_group, a.billing_business_unit }));
            }

            return new PagedData("GetMISNew expects a project_id");
        }
    }
}