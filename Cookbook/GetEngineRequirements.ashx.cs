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
    /// Summary description for GetEngineRequirements
    /// </summary>
    public class GetEngineRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<EngineReq> q = db.EngineReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
            } else {
                return new PagedData(q.Select(a => new { a.project_id, a.name }));
                //return new PagedData("GetEngineRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.engine_req_id, a.project_id, a.@new, a.name, a.exe_file, a.pdb_file, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            EngineReq record = new EngineReq();

                            record.project_id = int.Parse(filter);
                            record.name = (string)obj["name"];
                            record.@new = (bool)obj["new"];
                            record.exe_file= (string)obj["exe_file"];
                            record.pdb_file = (string)obj["pdb_file"];
                            record.notes = (string)obj["notes"];

                            db.EngineReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Engine requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<EngineReq> list = new List<EngineReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            EngineReq record = new EngineReq();
                            record.project_id = int.Parse(filter);
                            record.name = (string)objs[j]["name"];
                            record.@new = (bool)objs[j]["new"];
                            record.exe_file = (string)objs[j]["exe_file"];
                            record.pdb_file = (string)objs[j]["pdb_file"];
                            record.notes = (string)objs[j]["notes"];

                            db.EngineReqs.InsertOnSubmit(record);
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
                            string intro = "Existing Engine Requirement record modified: ";
                            
                            EngineReq record = db.EngineReqs.Single(a => a.engine_req_id.Equals((int)obj["engine_req_id"]));
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
                            if (record.exe_file != (string)obj["exe_file"])
                            {
                                logBuilder += "EXE File changed from \"" + record.exe_file + "\" to \"" + (string)obj["exe_file"] + "\".";
                            }
                            record.exe_file = (string)obj["exe_file"];
                            if (record.pdb_file != (string)obj["pdb_file"])
                            {
                                logBuilder += "PDB File changed from \"" + record.pdb_file + "\" to \"" + (string)obj["pdb_file"] + "\".";
                            }
                            record.pdb_file = (string)obj["pdb_file"];
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
                        List<EngineReq> list = new List<EngineReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            EngineReq record = db.EngineReqs.Single(a => a.engine_req_id.Equals((int)objs[j]["engine_req_id"]));
                            record.name = (string)objs[j]["name"];
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.exe_file = (string)objs[j]["exe_file"];
                            record.pdb_file = (string)objs[j]["pdb_file"];
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

                            EngineReq record = db.EngineReqs.Single(a => a.engine_req_id.Equals((int)obj["engine_req_id"]));
                            logbuilder += "Name: \"" + record.name + "\"; New: \"" + record.@new+ "\"; EXE File: \"" + record.exe_file + "\"; PDB File: \"" +
                                record.pdb_file + "\"; Notes: \"" + record.notes + "\".";
                                
                            
                            db.EngineReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Engine Requirement deleted: " + logbuilder;
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
                            EngineReq record = db.EngineReqs.Single(a => a.engine_req_id.Equals((int)objs[j]["engine_req_id"]));
                            db.EngineReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("EngineReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
            
        }
    }
}