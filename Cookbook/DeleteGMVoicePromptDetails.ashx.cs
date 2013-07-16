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
    /// Summary description for DeleteGMVoicePromptDetails
    /// </summary>
    public class DeleteGMVoicePromptDetails : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectInformation> q = db.ProjectInformations;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                if (db.GMVoicePromptDetails.Count(a => a.project_id.Equals(int.Parse(filter)) && a.language.Equals((string)blob["viewPromptsLangTwoLanguage"])) > 0)
                {
                    GMVoicePromptDetail record = db.GMVoicePromptDetails.Single(a => a.project_id.Equals(int.Parse(filter)) && a.language.Equals((string)blob["viewPromptsLangTwoLanguage"]));
                    db.GMVoicePromptDetails.DeleteOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData("project_id(" + filter + ") and language(" + (string)blob["viewPromptsLangTwoLanguage"] + ") deleted");
                }

                return new PagedData("project_id(" + filter + ") and language(" + (string)blob["viewPromptsLangTwoLanguage"] + ") don't exist");
            }

            return new PagedData("DeleteGMVoicePromptDetails.ashx requires a project_id");
        }
    }
}