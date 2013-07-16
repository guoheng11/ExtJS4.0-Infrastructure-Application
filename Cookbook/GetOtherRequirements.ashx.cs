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
    /// Summary description for GetOtherRequirements
    /// </summary>
    public class GetOtherRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<OtherReq> q = db.OtherReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                
            }
            else
            {

                return new PagedData("GetOtherRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.other_req_id, a.project_id, a.@new, a.misc, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            OtherReq record = new OtherReq();

                            record.project_id = int.Parse(filter);
                            record.@new = (bool)obj["new"];
                            record.misc = (string)obj["misc"];
                            record.notes = (string)obj["notes"];

                            db.OtherReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Other requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<OtherReq> list = new List<OtherReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            OtherReq record = new OtherReq();
                            record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.misc = (string)objs[j]["misc"];
                            record.notes = (string)objs[j]["notes"];

                            db.OtherReqs.InsertOnSubmit(record);
                            list.Add(record);
                        }

                        db.SubmitChanges();
                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            string logBuilder = "";
                            string intro = "Existing Other Requirement record modified: ";
                            
                            OtherReq record = db.OtherReqs.Single(a => a.other_req_id.Equals((int)obj["other_req_id"]));
                            //record.project_id = int.Parse(filter);
                            if (record.@new != (bool)obj["new"])
                            {
                                logBuilder += "New changed from \"" + record.@new + "\" to \"" + (bool)obj["new"] + "\".";
                            }
                            record.@new = (bool)obj["new"];
                            if (record.misc != (string)obj["misc"])
                            {
                                logBuilder += "Misc changed from \"" + record.misc + "\" to \"" + (string)obj["misc"] + "\".";
                            }
                            record.misc = (string)obj["misc"];
                            if (record.notes != (string)obj["notes"])
                            {
                                logBuilder += "Notes changed from \"" + record.notes + "\" to \"" + (string)obj["notes"] + "\".";
                            }
                            record.notes = (string)obj["notes"];

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

                            db.SubmitChanges();

                            return new PagedData(record);
                        }


                        JArray objs = (JArray)blob["rows"];
                        List<OtherReq> list = new List<OtherReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            OtherReq record = db.OtherReqs.Single(a => a.other_req_id.Equals((int)objs[j]["other_req_id"]));
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.misc = (string)objs[j]["misc"];
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

                            OtherReq record = db.OtherReqs.Single(a => a.other_req_id.Equals((int)obj["other_req_id"]));
                            logbuilder += "New: \"" + record.@new + "\"; Misc: \"" + record.misc + "\"; Notes: \"" + record.notes + "\".";
                                
                            db.OtherReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Other Requirement deleted: " + logbuilder;
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
                            OtherReq record = db.OtherReqs.Single(a => a.other_req_id.Equals((int)objs[j]["other_req_id"]));
                            db.OtherReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("OtherReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }

            
        }
    }
}