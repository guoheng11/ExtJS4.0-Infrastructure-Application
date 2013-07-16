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
    public class GetRequirementsTabRoutingRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<RequirementsTabRoutingRequirements> q = db.RequirementsTabRoutingRequirements;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

            }
            else
            {
                return new PagedData("GetRequirementsTabRoutingRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.reqtab_routing_req_id, a.project_id, a.@new, a.description, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            RequirementsTabRoutingRequirements record = new RequirementsTabRoutingRequirements();

                            record.project_id = int.Parse(filter);
                            record.@new = (bool)obj["new"];
                            record.description = (string)obj["description"];
                            record.notes = (string)obj["notes"];

                            db.RequirementsTabRoutingRequirements.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Routing requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<RequirementsTabRoutingRequirements> list = new List<RequirementsTabRoutingRequirements>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            RequirementsTabRoutingRequirements record = new RequirementsTabRoutingRequirements();
                            record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.description = (string)objs[j]["description"];
                            record.notes = (string)objs[j]["notes"];

                            db.RequirementsTabRoutingRequirements.InsertOnSubmit(record);
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
                            string intro = "Existing Routing record modified: ";

                            RequirementsTabRoutingRequirements record = db.RequirementsTabRoutingRequirements.Single(a => a.reqtab_routing_req_id.Equals((int)obj["reqtab_routing_req_id"]));
                            //record.project_id = int.Parse(filter);
                            if (record.@new != (bool)obj["new"])
                            {
                                logBuilder += "New changed from \"" + record.@new + "\" to \"" + (bool)obj["new"] + "\".";
                            }
                            record.@new = (bool)obj["new"];
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
                        List<RequirementsTabRoutingRequirements> list = new List<RequirementsTabRoutingRequirements>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            RequirementsTabRoutingRequirements record = db.RequirementsTabRoutingRequirements.Single(a => a.reqtab_routing_req_id.Equals((int)objs[j]["reqtab_routing_req_id"]));
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
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

                            RequirementsTabRoutingRequirements record = db.RequirementsTabRoutingRequirements.Single(a => a.reqtab_routing_req_id.Equals((int)obj["reqtab_routing_req_id"]));
                            logbuilder += "Description: \"" + record.description + "\"; New: \"" + record.@new + "\"; Notes: \"" + record.notes + "\".";

                            db.RequirementsTabRoutingRequirements.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Routing Requirement deleted: " + logbuilder;
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
                            RequirementsTabRoutingRequirements record = db.RequirementsTabRoutingRequirements.Single(a => a.reqtab_routing_req_id.Equals((int)objs[j]["reqtab_routing_req_id"]));
                            db.RequirementsTabRoutingRequirements.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("Routing req deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}