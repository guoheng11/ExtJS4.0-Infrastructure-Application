using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    public class UpdateNetworkOpsPage : DatabaseHandler
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
                * Begin: Network Ops Total Hours
                */

                if (blob["submittedTotalNetworkOpsHours"] != null)
                {
                    var currentRec = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    currentRec.total_net_ops_hours = (string)blob["submittedTotalNetworkOpsHours"];
                    db.SubmitChanges();
                }


                /*
                 * Begin: Comments Area
                 */

                if (blob["networkOpsCommentsArea"] != null)
                {
                    var oldComments = db.SWDSchedules.Single(a => a.project_id.Equals(int.Parse(filter)));
                    oldComments.net_ops_comments = (string)blob["networkOpsCommentsArea"];
                    db.SubmitChanges();
                }

                return new PagedData("UpdateNetworkOpsPage successfully updated|" + comment);
            }
            else
            {
                return new PagedData("UpdateNetworkOpsPage expects a project id");
            }

        }
    }
}