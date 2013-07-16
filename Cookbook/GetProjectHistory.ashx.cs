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
    /// Summary description for GetProjectHistory
    /// </summary>
    public class GetProjectHistory : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectHistory> q = db.ProjectHistories;
            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
            }
            else { return new PagedData("GetProjectHistory expects a project_id"); }

            string readOnly = context.Request.Params.Get("read_only");
            if (isNull(readOnly))
            {
                return new PagedData("read_only flag is expected");
            }
            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.project_history_id, a.project_id, a.description, a.date, a.user_name }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectHistory record = new ProjectHistory();
                            record.project_id = int.Parse(filter);
                            record.description = (string)obj["description"];

                            if ((String)obj["date"] != null)
                            {
                                record.date = (string)obj["date"];
                            }
                            else
                            {
                                //default to today
                                record.date = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
                            }
                            record.user_name = (string)obj["user_name"];

                            db.ProjectHistories.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(new { record.project_history_id, record.project_id, record.description, record.date, record.user_name });  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectHistory record = new ProjectHistory();
                            record.project_id = int.Parse(filter);
                            record.description = (string)objs[j]["description"];
                            if ((String)objs[j]["date"] != null)
                            {
                                record.date = (string)objs[j]["date"];
                            }
                            else
                            {
                                //default to today
                                record.date = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
                            }
                            record.user_name = (string)objs[j]["user_name"];

                            db.ProjectHistories.InsertOnSubmit(record);
                            db.SubmitChanges();

                            list.Add(new { record.project_history_id, record.project_id, record.description, record.date, record.user_name });
                        }

                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectHistory record = db.ProjectHistories.Single(a => a.project_history_id.Equals((int)obj["project_history_id"]));
                            record.description = (string)obj["description"];
                            if ((String)obj["date"] != null)
                            {
                                record.date = (string)obj["date"];
                                //try to update corresponding status object's date
                                if (db.ProjectStatus.Count(k => k.project_status_id == record.status_id) > 0)
                                {
                                    try
                                    {
                                        ProjectStatus statusRecord = db.ProjectStatus.First(k => k.project_status_id == record.status_id);
                                        statusRecord.date = (string)obj["date"];
                                    }
                                    catch (Exception)
                                    {
                                        //do nothing if error, just don't want to choke the handler
                                    }
                                }
                            }
                            else
                            {
                                //default to today
                                record.date = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
                            }
                            if (obj["user_name"] != null) { record.user_name = (string)obj["user_name"]; }

                            db.SubmitChanges();

                            return new PagedData(new { record.project_history_id, record.project_id, record.description, record.date, record.user_name });
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectHistory record = db.ProjectHistories.Single(a => a.project_history_id.Equals((int)objs[j]["project_history_id"]));
                            record.description = (string)objs[j]["description"];
                            if ((String)objs[j]["date"] != null)
                            {
                                record.date = (string)objs[j]["date"];
                                //try to update corresponding status object's date
                                if (db.ProjectStatus.Count(k => k.project_status_id == record.status_id) > 0)
                                {
                                    try
                                    {
                                        ProjectStatus statusRecord = db.ProjectStatus.First(k => k.project_status_id == record.status_id);
                                        statusRecord.date = (string)objs[j]["date"];
                                    }
                                    catch (Exception)
                                    {
                                        //do nothing if error, just don't want to choke the handler
                                    }
                                }
                            }
                            else
                            {
                                //default to today
                                record.date = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
                            }
                            if (objs[j]["user_name"] != null) { record.user_name = (string)objs[j]["user_name"]; }

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

                            string status = "";
                            ProjectHistory record = db.ProjectHistories.Single(a => a.project_history_id.Equals((int)obj["project_history_id"]));
                            var deletedRecordStatusID = record.status_id;
                            db.ProjectHistories.DeleteOnSubmit(record);
                            db.SubmitChanges();

                            if (deletedRecordStatusID != null)
                            {
                                if (db.ProjectStatus.Count(k => k.project_status_id == deletedRecordStatusID) > 0)
                                {
                                    try
                                    {
                                        ProjectStatus statusRecord = db.ProjectStatus.First(k => k.project_status_id == record.status_id);
                                        db.ProjectStatus.DeleteOnSubmit(statusRecord);
                                        db.SubmitChanges();

                                        string newCurrentStatus = "";
                                        try
                                        {
                                            List<ProjectStatus> sortedStatuses = db.ProjectStatus.Where(x => x.project_id == int.Parse(filter)).OrderByDescending(o => o.date).Take(1).ToList();
                                            newCurrentStatus = "new status_id to use as current: [" + sortedStatuses[0].project_status_id + "]";
                                        }
                                        catch (Exception)
                                        {

                                        }
                                        
                                        
                                        

                                        status += " corresponding Status deleted| " + newCurrentStatus;
                                    }
                                    catch (Exception)
                                    {
                                        status += " corresponding Status deletion error";
                                        //do nothing if error, just don't want to choke the handler
                                    }
                                }
                                else
                                {
                                    status += " corresponding Status not found";
                                }
                            }
                            else
                            {
                                status += " corresponding Status is null";
                            }
                            return new PagedData("deleted single ProjectHistory entry succesfully."+status);
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectHistory record = db.ProjectHistories.Single(a => a.project_history_id.Equals((int)objs[j]["project_history_id"]));
                            db.ProjectHistories.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();

                        return new PagedData("deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}