using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetRoutingRequirements
    /// </summary>
    public class GetRoutingRequirements : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<RoutingRequirement> q = db.RoutingRequirements;


            //one-time script
            /*List<RoutingRequirement> adds = db.RoutingRequirements.Where(a => a.remove_from.Equals(null) && a.route_to.Length > 1).ToList<RoutingRequirement>();
            for (int i = 0; i < adds.Count(); i++ )
            {
                adds[i].type = "add";
            }

            List<RoutingRequirement> changes = db.RoutingRequirements.Where(a => a.remove_from.Length > 1 && a.route_to.Length > 1).ToList<RoutingRequirement>();
            for (int i = 0; i < changes.Count(); i++)
            {
                changes[i].type = "change";
            }

            List<RoutingRequirement> deletes = db.RoutingRequirements.Where(a => a.remove_from.Length > 1 && a.route_to.Equals(null)).ToList<RoutingRequirement>();
            for (int i = 0; i < deletes.Count(); i++)
            {
                deletes[i].type = "remove";
            }
            db.SubmitChanges();*/

            string filter = context.Request.Params.Get("project_id");

            if (!isNull(filter))
            {
                int id = int.Parse(filter);
                q = q.Where(a => a.project_id.Equals(id));

                return new PagedData(q.Select(a => new { a.routing_requirements_id, a.dnis, a.route_to, a.remove_from, a.platform, a.description, a.platform_from, a.usan_date, a.usan_time, a.dnis_date, a.dnis_time, a.carrier_date, a.carrier_time, a.alias, a.type }));
            }

            return new PagedData(q.Select(a => new { a.project_id, a.dnis }));
            //return new PagedData("GetRoutingRequirements expects a project_id");
        }
    }
}