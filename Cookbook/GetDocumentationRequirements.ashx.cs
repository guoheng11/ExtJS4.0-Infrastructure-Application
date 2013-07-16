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
    /// Summary description for GetDocumentationRequirements
    /// </summary>
    public class GetDocumentationRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<DocumentationReq> q = db.DocumentationReqs;
            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
            }
            else
            { 
                return new PagedData("GetDocumentationRequirements expects a project_id");
            }

            string readOnly = context.Request.Params.Get("read_only");
            if (isNull(readOnly))
            {
                return new PagedData("read_only flag is expected");
            }
            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }

            string username = context.Request.Params.Get("user_name");

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.documentation_req_id, a.project_id, a.filename, a.latest_version, a.uat_version, a.prod_version, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            DocumentationReq record = new DocumentationReq();
                          
                            record.project_id = int.Parse(filter);
                            record.filename = (string)obj["filename"];
                            record.latest_version = (string)obj["latest_version"];
                            record.uat_version = (string)obj["uat_version"];
                            record.prod_version = (string)obj["prod_version"];
                            record.notes = (string)obj["notes"];
                           
                            db.DocumentationReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Documentation requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<DocumentationReq> list = new List<DocumentationReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            DocumentationReq record = new DocumentationReq();
                            record.project_id = int.Parse(filter);
                            record.filename = (string)objs[j]["filename"];
                            record.latest_version = (string)objs[j]["latest_version"];
                            record.uat_version = (string)objs[j]["uat_version"];
                            record.prod_version = (string)objs[j]["prod_version"];
                            record.notes = (string)objs[j]["notes"];

                            db.DocumentationReqs.InsertOnSubmit(record);
                            db.SubmitChanges();
                            list.Add(record);
                        }

                        
                        return new PagedData(list);

                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            string logBuilder = "";
                            string intro = "Existing Documentation record modified: ";

                            DocumentationReq record = db.DocumentationReqs.Single(a => a.documentation_req_id.Equals((int)obj["documentation_req_id"]));
                            if (record.filename != (string)obj["filename"])
                            {
                                logBuilder += "Filename changed from \"" + record.filename + "\" to \"" + (string)obj["filename"] + "\".";
                            }
                            record.filename = (string)obj["filename"];
                            //record.project_id = int.Parse(filter);
                            if (record.latest_version != (string)obj["latest_version"])
                            {
                                logBuilder += "Latest Version changed from \"" + record.latest_version + "\" to \"" + (string)obj["latest_version"] + "\".";
                            }
                            record.latest_version = (string)obj["latest_version"];
                            if (record.uat_version != (string)obj["uat_version"])
                            {
                                logBuilder += "UAT Version changed from \"" + record.uat_version + "\" to \"" + (string)obj["uat_version"] + "\".";
                            }
                            record.uat_version = (string)obj["uat_version"];
                            if (record.prod_version != (string)obj["prod_version"])
                            {
                                logBuilder += "Prod Version changed from \"" + record.prod_version + "\" to \"" + (string)obj["prod_version"] + "\".";
                            }
                            record.prod_version = (string)obj["prod_version"];
                            if (record.notes != (string)obj["notes"])
                            {
                                logBuilder += "Notes changed from \"" + record.notes + "\" to \"" + (string)obj["notes"] + "\".";
                            }
                            record.notes = (string)obj["notes"];
                            
                            db.SubmitChanges();

                            if (logBuilder != "")
                            {
                                ChangeLog newLog = new ChangeLog();
                                newLog.project_id = Convert.ToInt32(int.Parse(filter));
                                newLog.time = DateTime.Now.ToShortTimeString();
                                newLog.date = DateTime.Now.ToShortDateString();
                                newLog.tab = "Requirements";
                                newLog.user_name = username;
                                newLog.description = intro + logBuilder;
                                if (!db.ChangeLogs.Contains(newLog))
                                {
                                    db.ChangeLogs.InsertOnSubmit(newLog);
                                    db.SubmitChanges();
                                }
                            }

                            return new PagedData(record);
                        }


                        JArray objs = (JArray)blob["rows"];
                        List<DocumentationReq> list = new List<DocumentationReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            DocumentationReq record = db.DocumentationReqs.Single(a => a.documentation_req_id.Equals((int)objs[j]["documentation_req_id"]));
                            record.filename = (string)objs[j]["filename"];
                            //record.project_id = int.Parse(filter);
                            record.latest_version = (string)objs[j]["latest_version"];
                            record.uat_version = (string)objs[j]["uat_version"];
                            record.prod_version = (string)objs[j]["prod_version"];
                            record.notes = (string)objs[j]["notes"];

                            db.SubmitChanges();
                            list.Add(record);
                        }

                        return new PagedData(list);
                    }

                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            string logbuilder = "";

                            JObject obj = (JObject)blob["rows"];

                            DocumentationReq record = db.DocumentationReqs.Single(a => a.documentation_req_id.Equals((int)obj["documentation_req_id"]));
                            logbuilder += "Filename: \"" + record.filename + "\"; Latest Version: \"" + record.latest_version + "\"; UAT Version: \"" + record.uat_version + "\"; Prod Version: \"" +
                                record.prod_version + "\"; Notes: \"" + record.notes + "\".";
                                
                            db.DocumentationReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Documentation Requirement deleted: " + logbuilder;
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData("good");
                        }


                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            DocumentationReq record = db.DocumentationReqs.Single(a => a.documentation_req_id.Equals((int)objs[j]["documentation_req_id"]));
                            db.DocumentationReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("DocumentationReq deleted");
                    }


                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}