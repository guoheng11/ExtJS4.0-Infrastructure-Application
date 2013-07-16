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
     public class UpdateQAPage : DatabaseHandler
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
                * Begin: QA Total Hours added 2-1-13
                */

                if (blob["submittedTotalQAHours"] != null)
                {
                    var currentRec = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    currentRec.total_qa_hours = (string)blob["submittedTotalQAHours"];
                    db.SubmitChanges();
                }


                /*
                 * Begin: Comments Area
                 */

                if (blob["qaCommentsArea"] != null)
                {
                    var oldComments = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    oldComments.qa_comments = (string)blob["qaCommentsArea"];
                    db.SubmitChanges();
                }

                return new PagedData("UpdateQAPage successfully updated|"+comment);
            }
            else
            {
                return new PagedData("UpdateQAPage expects a project id");
            }
        
        }
    }
}