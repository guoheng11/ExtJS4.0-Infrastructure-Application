using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetPromptWorksheet
    /// </summary>
    public class GetPromptWorksheet : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<PromptWorksheet> q = db.PromptWorksheets;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new { a.prompt_worksheet_id, a.prompt_worksheet, a.prompt_summary, a.po_num, a.great_voice_total_fee, a.great_voice_cd_fee, a.gm_voices_total_fee }));
            }

            return new PagedData("GetPromptWorksheet expects a project_id");
        }
    }
}