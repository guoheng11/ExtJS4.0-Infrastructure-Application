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
    /// Summary description for GetApplicationRequirements
    /// </summary>
    public class GetApplicationRequirements : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ApplicationReq> q = db.ApplicationReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
            }
            else {
                return new PagedData(q.Select(a => new { a.project_id, a.name}));
                //return new PagedData("GetApplicationRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.application_req_id, a.project_id, a.@new, a.name, a.app_file, a.rpt_file, a.prm_file, a.prm_instructions, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            ApplicationReq record = new ApplicationReq();

                            record.project_id = int.Parse(filter);
                            record.name = (string)obj["name"];
                            record.@new = (bool)obj["new"];
                            record.app_file= (string)obj["app_file"];
                            record.rpt_file= (string)obj["rpt_file"];
                            record.prm_file= (string)obj["prm_file"];
                            record.prm_instructions= (string)obj["prm_instructions"];
                            record.notes = (string)obj["notes"];

                            db.ApplicationReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Application requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<ApplicationReq> list = new List<ApplicationReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ApplicationReq record = new ApplicationReq();
                            record.project_id = int.Parse(filter);
                            record.name = (string)objs[j]["name"];
                            record.@new = (bool)objs[j]["new"];
                            record.app_file = (string)objs[j]["app_file"];
                            record.rpt_file = (string)objs[j]["rpt_file"];
                            record.prm_file = (string)objs[j]["prm_file"];
                            record.prm_instructions = (string)objs[j]["prm_instructions"];
                            record.notes = (string)objs[j]["notes"];

                            db.ApplicationReqs.InsertOnSubmit(record);
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
                            string intro = "Existing Application record modified: ";

                            ApplicationReq record = db.ApplicationReqs.Single(a => a.application_req_id.Equals((int)obj["application_req_id"]));
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
                            if (record.app_file != (string)obj["app_file"])
                            {
                                logBuilder += "App File changed from \"" + record.app_file + "\" to \"" + (string)obj["app_file"] + "\".";
                            }
                            record.app_file = (string)obj["app_file"];
                            if (record.rpt_file != (string)obj["rpt_file"])
                            {
                                logBuilder += "RPT File changed from \"" + record.rpt_file + "\" to \"" + (string)obj["rpt_file"] + "\".";
                            }
                            record.rpt_file = (string)obj["rpt_file"];
                            if (record.prm_file != (string)obj["prm_file"])
                            {
                                logBuilder += "PRM File changed from \"" + record.prm_file + "\" to \"" + (string)obj["prm_file"] + "\".";
                            }
                            record.prm_file = (string)obj["prm_file"];
                            if (record.prm_instructions != (string)obj["prm_instructions"])
                            {
                                logBuilder += "PRM Instructions changed from \"" + record.prm_instructions + "\" to \"" + (string)obj["prm_instructions"] + "\".";
                            }
                            record.prm_instructions = (string)obj["prm_instructions"];
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
                        List<ApplicationReq> list = new List<ApplicationReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ApplicationReq record = db.ApplicationReqs.Single(a => a.application_req_id.Equals((int)objs[j]["application_req_id"]));
                            record.name = (string)objs[j]["name"];
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.app_file = (string)objs[j]["app_file"];
                            record.rpt_file = (string)objs[j]["rpt_file"];
                            record.prm_file = (string)objs[j]["prm_file"];
                            record.prm_instructions = (string)objs[j]["prm_instructions"];
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

                            ApplicationReq record = db.ApplicationReqs.Single(a => a.application_req_id.Equals((int)obj["application_req_id"]));
                            logbuilder += "Name: \"" + record.name + "\"; New: \"" + record.@new + "\"; App File: \"" + record.app_file + "\"; RPT File: \"" +
                                record.rpt_file + "\"; PRM File: \"" + record.prm_file + "\"; PRM Instructions: \"" + record.prm_instructions + "\"; Notes: \"" + record.notes + "\".";
                                
                            
                            db.ApplicationReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Application Requirement deleted: " + logbuilder;
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
                            ApplicationReq record = db.ApplicationReqs.Single(a => a.application_req_id.Equals((int)objs[j]["application_req_id"]));
                            db.ApplicationReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("ApplicationReq deleted");
                    }


                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}