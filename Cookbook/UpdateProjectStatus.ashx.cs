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
    /// Summary description for UpdateProjectStatus
    /// </summary>
    public class UpdateProjectStatus : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            if (!(db.ProjectInformations.Count(c=>c.project_id == (int)blob["project_id"]) > 0))
            {
                return new PagedData("UpdateProjectStatus.ashx requires a valid project ID");
            }

            if (db.StatusTypes.Count(a => a.type.Equals((string)blob["type"])) > 0)
            {
                ProjectStatus status = new ProjectStatus();
                status.project_id = (int)blob["project_id"];
                status.date = (string)blob["date"];
                status.status_type_id = db.StatusTypes.Single(a => a.type.Equals((string)blob["type"])).status_type_id;
                db.ProjectStatus.InsertOnSubmit(status);
                db.SubmitChanges();

                //update project histories
                ProjectHistory history = new ProjectHistory();
                history.project_id = (int)blob["project_id"];
                history.user_name = (string)blob["name"];
                history.date = (string)blob["date"];
                history.description = "Project status changed to \"" + db.StatusTypes.Single(a => a.type.Equals((string)blob["type"])).type + "\"";
                history.status_id = status.project_status_id;
                db.ProjectHistories.InsertOnSubmit(history);
                db.SubmitChanges();

                //update current_project_status
                var currProject = db.ProjectInformations.Single(a => a.project_id.Equals((int)blob["project_id"]));
                currProject.current_project_status = (string)blob["type"];
                db.SubmitChanges();

                return new PagedData("ProjectStatus and ProjectHistory updated", true);
            }
            else
            {
                return new PagedData("Error: Status not found. Please enter status via Status Editor or select an available status.", false);
            }
        }
    }
}