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
    /// Summary description for UpdateSWDPage
    /// </summary>
    public class UpdateBuffetLinkedProjects : DatabaseHandler
    {
        String comment = "comments:";
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
            var jsonSerializer = new JsonSerializer();
            String blob = (string)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                var projsArray = blob.Split(',');
                var currentProjNum = "";
                List<string> projsList = new List<string>();
                string returnString = "";
                foreach(string currentIteration in projsArray)
                {
                    currentProjNum = currentIteration.Trim();
                    if (currentProjNum!= "" && db.ProjectInformations.Count(a => a.project_number.Equals(currentProjNum)) > 0)
                    {
                        var currentProj = db.ProjectInformations.First(a => a.project_number.Equals(currentProjNum));
                        var currentProjUATInfo = db.UatProdInstalls.First(a => a.project_id.Equals(currentProj.project_id));
                        projsList.Add(currentProj.project_number + ";" + currentProjUATInfo.uat_usan_ccr + ";" + currentProjUATInfo.uat_ccr + ";" + currentProjUATInfo.uat_maintenance_start);
                    }
                }
                for (int i = 0; i < projsList.Count; i++)
                {
                    returnString += projsList[i];
                    if (i != projsList.Count - 1)
                    {
                        returnString += "|";
                    }
                }
                return new PagedData(returnString);
            }
            return new PagedData("success! " + comment);
        }
    }
}