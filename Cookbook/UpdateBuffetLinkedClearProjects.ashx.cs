using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{


    public class UpdateBuffetLinkedClearProjects : DatabaseHandler
    {
        String comment = "comments:";

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            //JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            String incomingProjectName = (string)(reader.ReadToEnd());

            string filter = context.Request.Params.Get("project_id");

            if (!isNull(filter))
            {
                var wiping = db.LinkedProjects.Where(a => a.project_id.Equals(int.Parse(filter)));
                db.LinkedProjects.DeleteAllOnSubmit(wiping);
                db.SubmitChanges();
                comment += "[Project ID: " + int.Parse(filter) + " cleared]";

                return new PagedData("success! "+comment);
            }
            return new PagedData("no proj id submitted");
        }
    }
}