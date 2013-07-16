using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetGMVoicePromptDetails
    /// </summary>
    public class GetGMVoicePromptDetails : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<GMVoicePromptDetail> q = db.GMVoicePromptDetails;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

                return new PagedData(q.Select(a => new
                {
                    a.project_id,
                    a.language,
                    a.prompts_recorded,
                    a.prompts_billed,
                    a.prompts_provided,
                    a.min_fee,
                    a.num_words,
                    a.order_type,
                    a.recording_sessions,
                    a.recording_studio,
                    a.prompts_converted,
                    a.conversion_sessions,
                    a.prompts_digitized,
                    a.fee_required,
                    a.cd_required,
                    a.cd_mailing_address,
                    a.prompt_format,
                    a.converted_prompt_format,
                    a.needs_approval,
                    a.setup_fee,
                    a.recording1_fee,
                    a.recording3_fee,
                    a.translation_fee,
                    a.delivery_fee,
                    a.total_recording_fee
                }));
            }

            return new PagedData("GetGMVoicePromptDetails expects a project_id");
        }
    }
}