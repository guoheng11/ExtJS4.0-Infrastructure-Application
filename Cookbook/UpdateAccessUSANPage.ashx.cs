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
    /// Summary description for UpdateQAPage
    /// </summary>
    public class UpdateAccessUSANPage : DatabaseHandler
    {
        String comment = "comments:";


        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            string username = context.Request.Params.Get("user_name");

            if (!isNull(filter))
            {

                /*
                 * Begin: Comments Area
                 */

                if (blob["accessUSANCommentsArea"] != null)
                {
                    var oldComments = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    oldComments.access_usan_comments = (string)blob["accessUSANCommentsArea"];
                    db.SubmitChanges();
                }
                return new PagedData("UpdateAccessUSANPage successfully updated|"+comment);
            }
            else
            {
                return new PagedData("UpdateAccessUSANPage expects a project id");
            }

        }
    }
}