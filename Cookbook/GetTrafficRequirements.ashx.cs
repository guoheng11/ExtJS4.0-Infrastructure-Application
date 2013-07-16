using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetTrafficRequirements
    /// </summary>
    public class GetTrafficRequirements : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<TrafficRequirement> q = db.TrafficRequirements;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.traffic_requirements_id, a.project_id, a.forecast, a.min_month, a.calls_month, a.busy_hour_calls, a.busy_hour_call_percentage, a.avg_call_duration }));
            }

            return new PagedData("GetTrafficRequirements expects a project_id");
        }
    }
}