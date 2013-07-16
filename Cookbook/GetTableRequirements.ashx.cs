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
    /// Summary description for GetTableRequirements
    /// </summary>
    public class GetTableRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<TableReq> q = db.TableReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                
            } else {
                return new PagedData(q.Select(a => new { a.project_id, a.name }));
                //return new PagedData("GetTableRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.table_req_id, a.project_id, a.@new, a.name, a.xls_csv_file, a.def_file, a.etm_file, a.table_type, a.uat_load, a.prod_load, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            TableReq record = new TableReq();

                            record.project_id = int.Parse(filter);
                            record.name = (string)obj["name"];
                            record.@new = (bool)obj["new"];
                            record.xls_csv_file = (string)obj["xls_csv_file"];
                            record.def_file = (string)obj["def_file"];
                            record.etm_file = (string)obj["etm_file"];
                            record.table_type = (string)obj["table_type"];
                            record.uat_load = (string)obj["uat_load"];
                            record.prod_load = (string)obj["prod_load"];
                            record.notes = (string)obj["notes"];

                            db.TableReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Table requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<TableReq> list = new List<TableReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            TableReq record = new TableReq();
                            record.project_id = int.Parse(filter);
                            record.name = (string)objs[j]["name"];
                            record.@new = (bool)objs[j]["new"];
                            record.xls_csv_file = (string)objs[j]["xls_csv_file"];
                            record.def_file = (string)objs[j]["def_file"];
                            record.etm_file = (string)objs[j]["etm_file"];
                            record.table_type = (string)objs[j]["table_type"];
                            record.uat_load = (string)objs[j]["uat_load"];
                            record.prod_load = (string)objs[j]["prod_load"];
                            record.notes = (string)objs[j]["notes"];

                            db.TableReqs.InsertOnSubmit(record);
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
                            string intro = "Existing Table record modified: ";

                            TableReq record = db.TableReqs.Single(a => a.table_req_id.Equals((int)obj["table_req_id"]));
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
                            if (record.xls_csv_file != (string)obj["xls_csv_file"])
                            {
                                logBuilder += "XLS/CSV File changed from \"" + record.xls_csv_file + "\" to \"" + (string)obj["xls_csv_file"] + "\".";
                            }
                            record.xls_csv_file = (string)obj["xls_csv_file"];
                            if (record.def_file != (string)obj["def_file"])
                            {
                                logBuilder += "DEF File changed from \"" + record.def_file + "\" to \"" + (string)obj["def_file"] + "\".";
                            }
                            record.def_file = (string)obj["def_file"];
                            if (record.etm_file != (string)obj["etm_file"])
                            {
                                logBuilder += "ETM File changed from \"" + record.etm_file + "\" to \"" + (string)obj["etm_file"] + "\".";
                            }
                            record.etm_file = (string)obj["etm_file"];
                            if (record.table_type != (string)obj["table_type"])
                            {
                                logBuilder += "Table Type changed from \"" + record.table_type + "\" to \"" + (string)obj["table_type"] + "\".";
                            }
                            record.table_type = (string)obj["table_type"];
                            if (record.uat_load != (string)obj["uat_load"])
                            {
                                logBuilder += "UAT Load changed from \"" + record.uat_load + "\" to \"" + (string)obj["uat_load"] + "\".";
                            }
                            record.uat_load = (string)obj["uat_load"];
                            if (record.prod_load != (string)obj["prod_load"])
                            {
                                logBuilder += "Prod Load changed from \"" + record.prod_load + "\" to \"" + (string)obj["prod_load"] + "\".";
                            }
                            record.prod_load = (string)obj["prod_load"];
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
                        List<TableReq> list = new List<TableReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            TableReq record = db.TableReqs.Single(a => a.table_req_id.Equals((int)objs[j]["table_req_id"]));
                            record.name = (string)objs[j]["name"];
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.xls_csv_file = (string)objs[j]["xls_csv_file"];
                            record.def_file = (string)objs[j]["def_file"];
                            record.etm_file = (string)objs[j]["etm_file"];
                            record.table_type = (string)objs[j]["table_type"];
                            record.uat_load = (string)objs[j]["uat_load"];
                            record.prod_load = (string)objs[j]["prod_load"];
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

                            TableReq record = db.TableReqs.Single(a => a.table_req_id.Equals((int)obj["table_req_id"]));
                            logbuilder += "Name: \"" + record.name + "\"; New: \"" + record.@new + "\"; XLS/CSV File: \"" + record.xls_csv_file+ "\"; Def File: \"" +
                                record.def_file + "\"; ETM File: \"" + record.etm_file + "\"; Table Type: \"" + record.table_type + "\"; UAT Load: \"" + 
                                record.uat_load + "\"; Prod Load: \"" + record.prod_load + "\"; Notes: \"" + record.notes + "\".";
                                
                            
                            db.TableReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Table Requirement deleted: " + logbuilder;
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
                            TableReq record = db.TableReqs.Single(a => a.table_req_id.Equals((int)objs[j]["table_req_id"]));
                            db.TableReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("TableReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}