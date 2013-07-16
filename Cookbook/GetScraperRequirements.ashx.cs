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
    /// Summary description for GetScraperRequirements
    /// </summary>
    public class GetScraperRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ScraperReq> q = db.ScraperReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
            } else {
                return new PagedData(q.Select(a => new { a.project_id, a.name }));
                //return new PagedData("GetScraperRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.scraper_req_id, a.project_id, a.@new, a.name, a.exe_file, a.pdb_file, a.ScraperType.type, a.new_tran_type, a.notes }));
                    }

                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            ScraperReq record = new ScraperReq();

                            record.project_id = int.Parse(filter);
                            record.name = (string)obj["name"];
                            if ((string)obj["type"] != "" && (string)obj["type"] != null)
                            {
                                record.scraper_type_id = (db.ScraperTypes.Single(a => a.type.Equals((string)obj["type"])).scraper_type_id);
                            }
                            record.@new = (bool)obj["new"];
                            record.exe_file = (string)obj["exe_file"];
                            record.pdb_file = (string)obj["pdb_file"];
                            record.new_tran_type = (string)obj["new_tran_type"];
                            record.notes = (string)obj["notes"];

                            db.ScraperReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Scraper requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            if ((string)obj["type"] != "" && (string)obj["type"] != null)
                            {
                                return new PagedData(new { record.scraper_req_id, record.project_id, record.@new, record.name, record.exe_file, record.pdb_file, record.ScraperType.type, record.new_tran_type, record.notes });
                            }
                            else
                            {
                                String type = "";
                                return new PagedData(new { record.scraper_req_id, record.project_id, record.@new, record.name, record.exe_file, record.pdb_file, type, record.new_tran_type, record.notes });
                            }
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<ScraperReq> list = new List<ScraperReq>();
                        List<Object> returnList = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ScraperReq record = new ScraperReq();
                            record.project_id = int.Parse(filter);
                            record.name = (string)objs[j]["name"];
                            record.@new = (bool)objs[j]["new"];
                            if ((string)objs[j]["type"] != "" && (string)objs[j]["type"] != null)
                            {
                                record.scraper_type_id = (db.ScraperTypes.Single(a => a.type.Equals((string)objs[j]["type"])).scraper_type_id);
                            }
                            record.exe_file = (string)objs[j]["exe_file"];
                            record.pdb_file = (string)objs[j]["pdb_file"];
                            record.new_tran_type = (string)objs[j]["new_tran_type"];
                            record.notes = (string)objs[j]["notes"];

                            db.ScraperReqs.InsertOnSubmit(record);
                            db.SubmitChanges();
                            list.Add(record);

                            if ((string)objs[j]["type"] != "" && (string)objs[j]["type"] != null)
                            {
                                returnList.Add(new { record.scraper_req_id, record.project_id, record.name, record.@new, record.ScraperType.type, record.new_tran_type, record.pdb_file, record.exe_file, record.notes });
                            } else {
                                String type = "";
                                returnList.Add(new { record.scraper_req_id, record.project_id, record.name, record.@new, type, record.new_tran_type, record.pdb_file, record.exe_file, record.notes });
                            }

                        }
                        
                        
                        return new PagedData(returnList);
                    }

                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            string logBuilder = "";
                            string intro = "Existing Scraper record modified: ";

                            ScraperReq record = db.ScraperReqs.Single(a => a.scraper_req_id.Equals((int)obj["scraper_req_id"]));
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
                            if ((string)obj["type"] != "" && (string)obj["type"] != null)
                            {
                                if (record.scraper_type_id != (db.ScraperTypes.Single(a => a.type.Equals((string)obj["type"])).scraper_type_id))
                                {
                                    logBuilder += "Scraper Type changed from \"" + record.scraper_type_id + "\" to \"" + (db.ScraperTypes.Single(a => a.type.Equals((string)obj["type"])).type) + "\".";
                                }
                                record.scraper_type_id = (db.ScraperTypes.Single(a => a.type.Equals((string)obj["type"])).scraper_type_id);
                            }
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
                            if (record.new_tran_type != (string)obj["new_tran_type"])
                            {
                                logBuilder += "New Tran Type changed from \"" + record.new_tran_type + "\" to \"" + (string)obj["new_tran_type"] + "\".";
                            }
                            record.new_tran_type = (string)obj["new_tran_type"];
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


                            if ((string)obj["type"] != "" && (string)obj["type"] != null)
                            {
                                return new PagedData(new { record.scraper_req_id, record.project_id, record.@new, record.name, record.exe_file, record.pdb_file, record.ScraperType.type, record.new_tran_type, record.notes });
                            }
                            else
                            {
                                String type = "";
                                return new PagedData(new { record.scraper_req_id, record.project_id, record.@new, record.name, record.exe_file, record.pdb_file, type, record.new_tran_type, record.notes });
                            }
                        }


                        JArray objs = (JArray)blob["rows"];
                        List<ScraperReq> list = new List<ScraperReq>();
                        List<Object> returnList = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ScraperReq record = db.ScraperReqs.Single(a => a.scraper_req_id.Equals((int)objs[j]["scraper_req_id"]));
                            record.name = (string)objs[j]["name"];
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            if ((string)objs[j]["type"] != "" && (string)objs[j]["type"] != null)
                            {
                                record.scraper_type_id = (db.ScraperTypes.Single(a => a.type.Equals((string)objs[j]["type"])).scraper_type_id);
                            }
                            record.exe_file = (string)objs[j]["exe_file"];
                            record.pdb_file = (string)objs[j]["pdb_file"];
                            record.new_tran_type = (string)objs[j]["new_tran_type"];
                            record.notes = (string)objs[j]["notes"];

                            db.SubmitChanges();
                            list.Add(record);

                            if ((string)objs[j]["type"] != "" && (string)objs[j]["type"] != null)
                            {
                                returnList.Add(new { record.scraper_req_id, record.project_id, record.name, record.@new, record.ScraperType.type, record.new_tran_type, record.pdb_file, record.exe_file, record.notes });
                            }
                            else
                            {
                                String type = "";
                                returnList.Add(new { record.scraper_req_id, record.project_id, record.name, record.@new, type, record.new_tran_type, record.pdb_file, record.exe_file, record.notes });
                            }
                        }

                        return new PagedData(returnList);
                    }

                case "DELETE":
                    {
                        

                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            string logbuilder = "";

                            //return new PagedData(obj);
                            ScraperReq record = db.ScraperReqs.Single(a => a.scraper_req_id.Equals((int)obj["scraper_req_id"]));
                            logbuilder += "Name: \"" + record.name + "\"; New: \"" + record.@new + "\"; Scraper Type: \"" + record.ScraperType.type + "\"; Exe File: \"" +
                                record.exe_file + "\"; PDB File: \"" + record.pdb_file + "\"; New Tran Type: \"" + record.new_tran_type + "\"; Notes: \"" + record.notes + "\".";
                                
                            
                            db.ScraperReqs.DeleteOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Scraper Requirement deleted: " + logbuilder;
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData("good");
                        }


                        JArray objs = (JArray)blob["rows"];
                        //return new PagedData(objs);
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ScraperReq record = db.ScraperReqs.Single(a => a.scraper_req_id.Equals((int)objs[j]["scraper_req_id"]));
                            db.ScraperReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("ScraperReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
            
        }
    }
}