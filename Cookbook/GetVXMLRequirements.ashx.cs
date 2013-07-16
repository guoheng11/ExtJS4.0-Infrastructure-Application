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
    /// Summary description for GetVXMLRequirements
    /// </summary>
    public class GetVXMLRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<VXMLReq> q = db.VXMLReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                
            } else {
                 return new PagedData("GetVXMLRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.vxmlreq_id, a.project_id, a.@new, a.filename, a.description, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            VXMLReq record = new VXMLReq();

                            record.project_id = int.Parse(filter);
                            record.@new = (bool)obj["new"];
                            record.filename = (string)obj["filename"];
                            record.description = (string)obj["description"];
                            record.notes = (string)obj["notes"];

                            db.VXMLReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New VXML requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<VXMLReq> list = new List<VXMLReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            VXMLReq record = new VXMLReq();
                            record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.filename = (string)objs[j]["filename"];
                            record.description = (string)objs[j]["description"];
                            record.notes = (string)objs[j]["notes"];

                            db.VXMLReqs.InsertOnSubmit(record);
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
                            string intro = "Existing VXML record modified: ";

                            VXMLReq record = db.VXMLReqs.Single(a => a.vxmlreq_id.Equals((int)obj["vxmlreq_id"]));
                            //record.project_id = int.Parse(filter);
                            if (record.@new != (bool)obj["new"])
                            {
                                logBuilder += "New changed from \"" + record.@new + "\" to \"" + (bool)obj["new"] + "\".";
                            }
                            record.@new = (bool)obj["new"];
                            if (record.filename != (string)obj["filename"])
                            {
                                logBuilder += "Filename changed from \"" + record.filename + "\" to \"" + (string)obj["filename"] + "\".";
                            }
                            record.filename = (string)obj["filename"];
                            if (record.description != (string)obj["description"])
                            {
                                logBuilder += "Description changed from \"" + record.description + "\" to \"" + (string)obj["description"] + "\".";
                            }
                            record.description = (string)obj["description"];
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
                        List<VXMLReq> list = new List<VXMLReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            VXMLReq record = db.VXMLReqs.Single(a => a.vxmlreq_id.Equals((int)objs[j]["vxmlreq_id"]));
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.filename = (string)objs[j]["filename"];
                            record.description = (string)objs[j]["description"];
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

                            VXMLReq record = db.VXMLReqs.Single(a => a.vxmlreq_id.Equals((int)obj["vxmlreq_id"]));
                            logbuilder += "Description: \"" + record.description + "\"; New: \"" + record.@new + "\"; Filename: \"" + record.filename + "\"; Notes: \"" + record.notes + "\".";
                            
                            db.VXMLReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing VXML Requirement deleted: " + logbuilder;
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
                            VXMLReq record = db.VXMLReqs.Single(a => a.vxmlreq_id.Equals((int)objs[j]["vxmlreq_id"]));
                            db.VXMLReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("VXMLReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}