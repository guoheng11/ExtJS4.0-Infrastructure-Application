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
    /// Summary description for UpdateTrafficRequirementAddDnises
    /// </summary>
    public class UpdateTrafficRequirementAddDnises : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string readOnly = context.Request.Params.Get("read_only");
            if (isNull(readOnly))
            {
                return new PagedData("read_only flag is expected");
            }
            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }

            IQueryable<RoutingRequirement> q = db.RoutingRequirements;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            string user_name = context.Request.Params.Get("user_name");
            string permission = context.Request.Params.Get("permission");
            string filter = context.Request.Params.Get("project_id");
            string intro = "The Traffic & Routing page's Add Dnis grid had the following modifications: ";
            string logBuilder = "";

            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        filter = context.Request.Params.Get("project_id");
                        if (!isNull(filter))
                        {
                            int id = int.Parse(filter);
                            q = q.Where(a => a.project_id.Equals(id) && a.type.Equals("add"));   //(smm - not needed) && a.remove_from.Equals(null) && a.route_to.Length > 1);
                        }

                        return new PagedData(q.Select(a => new { a.routing_requirements_id, a.project_id, a.dnis, a.route_to, a.platform, a.description, a.usan_date, a.usan_time, a.dnis_date, a.dnis_time, a.carrier_date, a.carrier_time, a.alias, a.type }));
                    }
                case "POST":
                    {
                        try
                        {
                            if (blob["rows"].GetType() == typeof(JObject))
                            {
                                JObject obj = (JObject)blob["rows"];

                                RoutingRequirement record = new RoutingRequirement();



                                try
                                {
                                    record.project_id = (int)obj["project_id"];
                                }
                                catch (ArgumentException)
                                {
                                    record.project_id = int.Parse(filter);
                                }


                                record.dnis = (String)obj["dnis"];
                                if (obj["platform"].GetType() == typeof(JValue))
                                    record.platform = (String)obj["platform"];
                                else
                                {
                                    string platforms = (String)((JArray)obj["platform"])[0];
                                    for (int i = 1; i < ((JArray)obj["platform"]).Count; i++)
                                    {
                                        platforms = platforms + ", " + (String)((JArray)obj["platform"])[i];
                                    }
                                    record.platform = platforms;
                                }
                                record.description = (String)obj["description"];
                                record.usan_time = (String)obj["usan_time"];
                                record.usan_date = (String)obj["usan_date"];
                                record.route_to = (String)obj["route_to"];
                                record.dnis_date = (String)obj["dnis_date"];
                                record.dnis_time = (String)obj["dnis_time"];
                                record.carrier_date = (String)obj["carrier_date"];
                                record.carrier_time = (String)obj["carrier_time"];
                                record.alias = (String)obj["alias"];
                                record.type = "add";  //smm

                                db.RoutingRequirements.InsertOnSubmit(record);
                                db.SubmitChanges();
                                logBuilder = "New row added";
                                //if (permission != "PM")
                                //{
                                    intro = (intro + logBuilder);
                                    intro = intro.Trim();

                                    if (intro.LastIndexOf(";") == intro.Length - 1)
                                    {
                                        intro = intro.Substring(0, intro.Length - 1);
                                    }
                                    ChangeLog newLog = new ChangeLog();
                                    newLog.project_id = Convert.ToInt32(filter);
                                    newLog.time = DateTime.Now.ToShortTimeString();
                                    newLog.date = DateTime.Now.ToShortDateString();
                                    newLog.tab = "Traffic & Routing";
                                    newLog.user_name = user_name;
                                    newLog.description = intro;
                                    if ((!db.ChangeLogs.Contains(newLog)) && (logBuilder.Length > 0))
                                    {
                                        db.ChangeLogs.InsertOnSubmit(newLog);
                                        db.SubmitChanges();
                                    }
                                //}
                                return new PagedData(new { record.routing_requirements_id, record.project_id, record.dnis, record.route_to, record.platform, record.description, record.usan_date, record.usan_time, record.dnis_date, record.dnis_time, record.carrier_date, record.carrier_time, record.alias, record.type });
                            }

                            JArray objs = (JArray)blob["rows"];
                            List<Object> list = new List<Object>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                RoutingRequirement record = new RoutingRequirement();


                                try
                                {
                                    record.project_id = (int)objs[j]["project_id"];
                                }
                                catch (ArgumentException)
                                {
                                    record.project_id = int.Parse(filter);
                                }

                                record.dnis = (String)objs[j]["dnis"];
                                if (objs[j]["platform"].GetType() == typeof(JValue))
                                    record.platform = (String)objs[j]["platform"];
                                else
                                {
                                    string platforms = (String)((JArray)objs[j]["platform"])[0];
                                    for (int i = 1; i < ((JArray)objs[j]["platform"]).Count; i++)
                                    {
                                        platforms = platforms + ", " + (String)((JArray)objs[j]["platform"])[i];
                                    }
                                    record.platform = platforms;
                                }
                                record.description = (String)objs[j]["description"];
                                record.usan_date = (String)objs[j]["usan_date"];
                                record.usan_time = (String)objs[j]["usan_time"];
                                record.route_to = (String)objs[j]["route_to"];
                                record.dnis_date = (String)objs[j]["dnis_date"];
                                record.dnis_time = (String)objs[j]["dnis_time"];
                                record.carrier_date = (String)objs[j]["carrier_date"];
                                record.carrier_time = (String)objs[j]["carrier_time"];
                                record.alias = (String)objs[j]["alias"];
                                record.type = "add";  //smm

                                db.RoutingRequirements.InsertOnSubmit(record);
                                db.SubmitChanges();

                                list.Add(new { record.routing_requirements_id, record.project_id, record.dnis, record.route_to, record.platform, record.description, record.usan_date, record.usan_time, record.dnis_date, record.dnis_time, record.carrier_date, record.carrier_time, record.alias, record.type });
                            }

                            return new PagedData(list);
                        }
                        catch (Exception e)
                        {
                            return new PagedData("Error: " + e.Message + "|" + e.HelpLink + "|" + e.InnerException + "|" + e.Source + "|" + e.StackTrace + "|" + e.TargetSite);
                        }

                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            RoutingRequirement record = db.RoutingRequirements.Single(a => a.routing_requirements_id.Equals((int)obj["routing_requirements_id"]));
                            if (record.dnis != null && record.dnis.Length > 0)
                            {
                                intro += "Row New Dnis: \"" + record.dnis + "\": ";
                            }
                            else
                            {
                                intro += "Row New Dnis: \"(empty DNIS)\": ";
                            }
                            
                            if (record.dnis != (String)obj["dnis"])
                            {
                                logBuilder += "New Dnis changed from \"" + record.dnis + "\" -> \"" + (String)obj["dnis"] + "\"; ";
                            }
                            record.dnis = (String)obj["dnis"];
                            if (obj["platform"].GetType() == typeof(JValue))
                            {
                                if (record.platform != (String)obj["platform"])
                                {
                                    logBuilder += "Platform changed from \"" + record.platform + "\" -> \"" + (String)obj["platform"] + "\"; ";
                                }
                                record.platform = (String)obj["platform"];
                            }
                            else
                            {
                                string platforms = (String)((JArray)obj["platform"])[0];
                                for (int i = 1; i < ((JArray)obj["platform"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)obj["platform"])[i];
                                }
                                if (record.platform != platforms)
                                {
                                    logBuilder += "Platform changed from \"" + record.platform + "\" -> \"" + platforms + "\"; ";
                                }
                                record.platform = platforms;
                            }
                            if (record.description != (String)obj["description"])
                            {
                                logBuilder += "Description changed from \"" + record.description + "\" -> \"" + (String)obj["description"] + "\"; ";
                            }
                            record.description = (String)obj["description"];
                            if (record.usan_time != (String)obj["usan_time"])
                            {
                                logBuilder += "USAN Prod Routing Time changed from \"" + record.usan_time + "\" -> \"" + (String)obj["usan_time"] + "\"; ";
                            }
                            record.usan_time = (String)obj["usan_time"];
                            if (record.usan_date != (String)obj["usan_date"])
                            {
                                logBuilder += "USAN Prod Routing Date changed from \"" + record.usan_date + "\" -> \"" + (String)obj["usan_date"] + "\"; ";
                            }
                            record.usan_date = (String)obj["usan_date"];
                            if (record.route_to != (String)obj["route_to"])
                            {
                                logBuilder += "App To Be Routed To changed from \"" + record.route_to + "\" -> \"" + (String)obj["route_to"] + "\"; ";
                            }
                            record.route_to = (String)obj["route_to"];
                            if (record.dnis_date != (String)obj["dnis_date"])
                            {
                                logBuilder += "DNIS Table Prod Load Date changed from \"" + record.dnis_date + "\" -> \"" + (String)obj["dnis_date"] + "\"; ";
                            }
                            record.dnis_date = (String)obj["dnis_date"];
                            if (record.dnis_time != (String)obj["dnis_time"])
                            {
                                logBuilder += "DNIS Table Prod Load Time changed from \"" + record.dnis_time + "\" -> \"" + (String)obj["dnis_time"] + "\"; ";
                            }
                            record.dnis_time = (String)obj["dnis_time"];
                            if (record.carrier_date != (String)obj["carrier_date"])
                            {
                                logBuilder += "Carrier Prod Routing Date changed from \"" + record.carrier_date + "\" -> \"" + (String)obj["carrier_date"] + "\"; ";
                            }
                            record.carrier_date = (String)obj["carrier_date"];
                            if (record.carrier_time != (String)obj["carrier_time"])
                            {
                                logBuilder += "Carrier Prod Routing Time changed from \"" + record.carrier_time + "\" -> \"" + (String)obj["carrier_time"] + "\"; ";
                            }
                            record.carrier_time = (String)obj["carrier_time"];
                            if (record.alias != (String)obj["alias"])
                            {
                                logBuilder += "Alias changed from \"" + record.alias + "\" -> \"" + (String)obj["alias"] + "\"; ";
                            }
                            record.alias = (String)obj["alias"];
                            record.type = "add";  //smm

                            db.SubmitChanges();
                            //if (permission != "PM")
                            //{
                                intro = (intro + logBuilder);
                                intro = intro.Trim();

                                if (intro.LastIndexOf(";") == intro.Length - 1)
                                {
                                    intro = intro.Substring(0, intro.Length - 1);
                                }
                                ChangeLog newLog = new ChangeLog();
                                newLog.project_id = Convert.ToInt32(filter);
                                newLog.time = DateTime.Now.ToShortTimeString();
                                newLog.date = DateTime.Now.ToShortDateString();
                                newLog.tab = "Traffic & Routing";
                                newLog.user_name = user_name;
                                newLog.description = intro;
                                if ((!db.ChangeLogs.Contains(newLog)) && (logBuilder.Length > 0))
                                {
                                    db.ChangeLogs.InsertOnSubmit(newLog);
                                    db.SubmitChanges();
                                }
                            //}
                            return new PagedData(new { record.routing_requirements_id, record.project_id, record.dnis, record.route_to, record.platform, record.description, record.usan_date, record.usan_time, record.dnis_date, record.dnis_time, record.carrier_date, record.carrier_time, record.alias, record.type });
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            RoutingRequirement record = db.RoutingRequirements.Single(a => a.routing_requirements_id.Equals((int)objs[j]["routing_requirements_id"]));
                            record.dnis = (String)objs[j]["dnis"];
                            if (objs[j]["platform"].GetType() == typeof(JValue))
                                record.platform = (String)objs[j]["platform"];
                            else
                            {
                                string platforms = (String)((JArray)objs[j]["platform"])[0];
                                for (int i = 1; i < ((JArray)objs[j]["platform"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)objs[j]["platform"])[i];
                                }
                                record.platform = platforms;
                            }
                            record.description = (String)objs[j]["description"];
                            record.usan_date = (String)objs[j]["usan_date"];
                            record.usan_time = (String)objs[j]["usan_time"];
                            record.route_to = (String)objs[j]["route_to"];
                            record.dnis_date = (String)objs[j]["dnis_date"];
                            record.dnis_time = (String)objs[j]["dnis_time"];
                            record.carrier_date = (String)objs[j]["carrier_date"];
                            record.carrier_time = (String)objs[j]["carrier_time"];
                            record.alias = (String)objs[j]["alias"];
                            record.type = "add";  //smm

                            list.Add(new { record.routing_requirements_id, record.project_id, record.dnis, record.route_to, record.platform, record.description, record.usan_date, record.usan_time, record.dnis_date, record.dnis_time, record.carrier_date, record.carrier_time, record.alias, record.type });
                        }

                        db.SubmitChanges();

                        return new PagedData(list);
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            RoutingRequirement record = db.RoutingRequirements.Single(a => a.routing_requirements_id.Equals((int)obj["routing_requirements_id"]));
                            logBuilder += "Row deleted: New Dnis: \"" + record.dnis + "\"; APP To Be Routed To: \"" + record.route_to + "\"; Platform: \"" + record.platform + "\"; Description: \"" +
                                record.description + "\"; USAN Prod Routing Date: \"" + record.usan_date + "\"; USAN Prod Routing Time: \"" + record.usan_time + "\"; DNIS Table Prod Load Date: \"" + record.dnis_date +
                                "\"; DNIS Table Prod Load Time: \"" + record.dnis_time + "\"; Carrier Prod Routing Date: \"" + record.carrier_date + "\"; Carrier Prod Routing Time: \"" + record.carrier_time + "\"; Alias: \"" +
                                record.alias + "\"";
                            db.RoutingRequirements.DeleteOnSubmit(record);

                            db.SubmitChanges();
                            //if (permission != "PM")
                            //{
                                intro = (intro + logBuilder);
                                intro = intro.Trim();

                                if (intro.LastIndexOf(";") == intro.Length - 1)
                                {
                                    intro = intro.Substring(0, intro.Length - 1);
                                }
                                ChangeLog newLog = new ChangeLog();
                                newLog.project_id = Convert.ToInt32(filter);
                                newLog.time = DateTime.Now.ToShortTimeString();
                                newLog.date = DateTime.Now.ToShortDateString();
                                newLog.tab = "Traffic & Routing";
                                newLog.user_name = user_name;
                                newLog.description = intro;
                                if ((!db.ChangeLogs.Contains(newLog)) && (logBuilder.Length > 0))
                                {
                                    db.ChangeLogs.InsertOnSubmit(newLog);
                                    db.SubmitChanges();
                                }
                           // }
                            return new PagedData("dnis deleted");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            RoutingRequirement record = db.RoutingRequirements.Single(a => a.routing_requirements_id.Equals((int)objs[j]["routing_requirements_id"]));
                            db.RoutingRequirements.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();

                        return new PagedData("dnises deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}