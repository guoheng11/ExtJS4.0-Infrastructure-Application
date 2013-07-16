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
    /// Summary description for GetBackofficeWebserviceRequirements
    /// </summary>
    public class GetBackofficeWebserviceRequirements : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<BackofficeWebserviceReq> q = db.BackofficeWebserviceReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
            }
            else
            {
                return new PagedData("GetBackofficeWebserviceRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.backoffice_webservice_req_id, a.project_id, a.@new, a.name, a.war_file, a.tar_file, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            BackofficeWebserviceReq record = new BackofficeWebserviceReq();

                            record.project_id = int.Parse(filter);
                            record.name = (string)obj["name"];
                            record.@new = (bool)obj["new"];
                            record.war_file = (string)obj["war_file"];
                            record.tar_file = (string)obj["tar_file"];
                            record.notes = (string)obj["notes"];

                            db.BackofficeWebserviceReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Backoffice Web Service requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<BackofficeWebserviceReq> list = new List<BackofficeWebserviceReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            BackofficeWebserviceReq record = new BackofficeWebserviceReq();
                            record.project_id = int.Parse(filter);
                            record.name = (string)objs[j]["name"];
                            record.@new = (bool)objs[j]["new"];
                            record.war_file = (string)objs[j]["war_file"];
                            record.tar_file = (string)objs[j]["tar_file"];
                            record.notes = (string)objs[j]["notes"];

                            db.BackofficeWebserviceReqs.InsertOnSubmit(record);
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
                            string intro = "Existing Backoffice Web Service record modified: ";

                            BackofficeWebserviceReq record = db.BackofficeWebserviceReqs.Single(a => a.backoffice_webservice_req_id.Equals((int)obj["backoffice_webservice_req_id"]));
                            if (record.name != (string)obj["name"])
                            {
                                logBuilder += "Name changed from \"" + record.name + "\" to \"" + (string)obj["name"] + "\".";
                            }
                            record.name = (string)obj["name"];
                            //record.project_id = int.Parse(filter);
                            if (record.@new != (bool)obj["new"])
                            {
                                logBuilder += "New changed from \"" + record.@new + "\" to \"" + (bool)obj["new"] + "\".";
                            }
                            record.@new = (bool)obj["new"];
                            if (record.war_file != (string)obj["war_file"])
                            {
                                logBuilder += "WAR File changed from \"" + record.war_file + "\" to \"" + (string)obj["war_file"] + "\".";
                            }
                            record.war_file = (string)obj["war_file"];
                            if (record.tar_file != (string)obj["tar_file"])
                            {
                                logBuilder += "TAR File changed from \"" + record.tar_file + "\" to \"" + (string)obj["tar_file"] + "\".";
                            }
                            record.tar_file = (string)obj["tar_file"];
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
                        List<BackofficeWebserviceReq> list = new List<BackofficeWebserviceReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            BackofficeWebserviceReq record = db.BackofficeWebserviceReqs.Single(a => a.backoffice_webservice_req_id.Equals((int)objs[j]["backoffice_webservice_req_id"]));
                            record.name = (string)objs[j]["name"];
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.war_file = (string)objs[j]["war_file"];
                            record.tar_file = (string)objs[j]["tar_file"];
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
                            JObject obj = (JObject)blob["rows"];

                            string logbuilder = "";

                            BackofficeWebserviceReq record = db.BackofficeWebserviceReqs.Single(a => a.backoffice_webservice_req_id.Equals((int)obj["backoffice_webservice_req_id"]));
                            logbuilder += "Name: \"" + record.name + "\"; New: \"" + record.@new + "\"; WAR File: \"" + record.war_file+ "\"; TAR File: \"" + record.tar_file + 
                                "\"; Notes: \"" + record.notes + "\".";
                            db.BackofficeWebserviceReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Backoffice Web Service Requirement deleted: " + logbuilder;
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
                            BackofficeWebserviceReq record = db.BackofficeWebserviceReqs.Single(a => a.backoffice_webservice_req_id.Equals((int)objs[j]["backoffice_webservice_req_id"]));
                            db.BackofficeWebserviceReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("BackofficeWebserviceReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }

            
        }
    }
}