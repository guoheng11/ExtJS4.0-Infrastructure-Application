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
    /// Summary description for UpdateSystemsPage
    /// </summary>
    public class UpdateSystemsPage : DatabaseHandler
    {
        String comment = "comments:";
        String comment2 = "comments:";

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            string username = context.Request.Params.Get("user_name");
            string permission = context.Request.Params.Get("permission");

            if (!isNull(filter))
            {
                //AH: the hardware/software and systems reqs are now stored in their respective GET handlers
                if (blob["systemsCommentsArea"] != null)
                {
                    var oldComments = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    oldComments.systems_comments = (string)blob["systemsCommentsArea"];
                    db.SubmitChanges();
                }
                else
                {
                    var oldComments = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    oldComments.systems_comments = "";
                    db.SubmitChanges();
                }
            }
            return new PagedData("success! " + comment2 + comment);
        }
    }
}