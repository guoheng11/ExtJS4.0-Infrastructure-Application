using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    /// <summary>
    /// Summary description for UpdatePromptsMisc
    /// </summary>
    public class UpdatePromptsMisc : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<PromptWorksheet> q = db.PromptWorksheets;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                PromptWorksheet record = db.PromptWorksheets.Single(a => a.project_id.Equals(int.Parse(filter)));

                if (blob["promptsPromptWorksheet"] != null) { record.prompt_worksheet = (String)blob["promptsPromptWorksheet"]; }
                if (blob["promptsSummary"] != null) { record.prompt_summary = (String)blob["promptsSummary"]; }
                if (blob["promptsPONum"] != null) { record.po_num = (String)blob["promptsPONum"]; }
                if (blob["viewPromptsGreatVoiceCDFee"] != null) { record.great_voice_cd_fee = (String)blob["viewPromptsGreatVoiceCDFee"]; }
                if (blob["viewPromptsGreatVoiceTotalFee"] != null) { record.great_voice_total_fee = (String)blob["viewPromptsGreatVoiceTotalFee"]; }
                if (blob["viewPromptsGMVoicesTotalFee"] != null) { record.gm_voices_total_fee = (String)blob["viewPromptsGMVoicesTotalFee"]; }
                
                db.SubmitChanges();
                return new PagedData("Prompts worksheet and summary saved");
            }

            return new PagedData("UpdatePromptsMisc.ashx requires a project_id");
        }
    }
}