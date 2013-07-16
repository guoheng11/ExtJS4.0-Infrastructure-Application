using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetProjectContacts
    /// </summary>
    public class GetProjectContacts : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectContact> q = db.ProjectContacts;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id.Equals(int.Parse(filter)));
                
                return new PagedData(q.Select(a => new { a.Contact.contact_id, a.Contact.name, a.type }));
            }

            return new PagedData("GetProjectContacts expects a project_id");
        }
    }
}