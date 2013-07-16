using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetPromptMNumsRequired
    /// </summary>
    public class GetPromptMNumsRequired : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<PromptMNumsRequired> q = db.PromptMNumsRequireds;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.promptmnums_required_id, a.type, a.number_prompts, a.language, a.corresponding_language1,
                a.corresponding_language2, a.corresponding_language3, a.corresponding_language4, a.corresponding_language5, a.corresponding_language6,
                a.corresponding_language7, a.corresponding_language8, a.corresponding_language9 }));
            }

            return new PagedData("GetPromptMNumsRequired expects a project_id");
        }
    }
}