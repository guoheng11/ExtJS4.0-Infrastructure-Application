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
    /// Summary description for GetServiceIDRequirements
    /// </summary>
    public class GetServiceIDRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ServiceIDReq> q = db.ServiceIDReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                
            }
            else
            {

                return new PagedData("GetServiceIDRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.serviceid_req_id, a.project_id, a.@new, a.product, a.service_id, a.BusinessUnit.name, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            ServiceIDReq record = new ServiceIDReq();

                            record.project_id = int.Parse(filter);
                            record.@new = (bool)obj["new"];
                            record.product = (string)obj["product"];
                            record.service_id = (string)obj["service_id"];
                            if ((string)obj["name"] != "" && (string)obj["name"] != null)
                            {
                                record.business_units_id = (db.BusinessUnits.Single(a => a.name.Equals((string)obj["name"])).business_units_id);
                            }

                            record.notes = (string)obj["notes"];

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Service ID requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            db.ServiceIDReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            if ((string)obj["name"] != "" && (string)obj["name"] != null)
                            {
                                return new PagedData(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, record.BusinessUnit.name, record.notes });
                            }
                            else
                            {
                                String name = "";
                                return new PagedData(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, name, record.notes });
                            }
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<ServiceIDReq> list = new List<ServiceIDReq>();
                        List<Object> returnList = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ServiceIDReq record = new ServiceIDReq();
                            record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            if ((string)objs[j]["name"] != "" && (string)objs[j]["name"] != null)
                            {
                                record.business_units_id = (db.BusinessUnits.Single(a => a.name.Equals((string)objs[j]["name"])).business_units_id);
                            }
                            record.product = (string)objs[j]["product"];
                            record.service_id = (string)objs[j]["service_id"];
                            record.notes = (string)objs[j]["notes"];

                            db.ServiceIDReqs.InsertOnSubmit(record);
                            db.SubmitChanges();
                            list.Add(record);

                            if ((string)objs[j]["name"] != "" && (string)objs[j]["name"] != null)
                            {
                                returnList.Add(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, record.BusinessUnit.name, record.notes });
                            } else {
                                String name = "";
                                returnList.Add(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, name, record.notes });
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
                            string intro = "Existing Service ID record modified: ";
                            
                            ServiceIDReq record = db.ServiceIDReqs.Single(a => a.serviceid_req_id.Equals((int)obj["serviceid_req_id"]));
                            //record.project_id = int.Parse(filter);
                            if (record.@new != (bool)obj["new"])
                            {
                                logBuilder += "New changed from \"" + record.@new + "\" to \"" + (bool)obj["new"] + "\".";
                            }
                            record.@new = (bool)obj["new"];
                            if (record.product != (string)obj["product"])
                            {
                                logBuilder += "Product changed from \"" + record.product + "\" to \"" + (string)obj["product"] + "\".";
                            }
                            record.product = (string)obj["product"];
                            if (record.service_id != (string)obj["service_id"])
                            {
                                logBuilder += "Service ID changed from \"" + record.service_id + "\" to \"" + (string)obj["service_id"] + "\".";
                            }
                            record.service_id = (string)obj["service_id"];
                            if ((string)obj["name"] != "" && (string)obj["name"] != null)
                            {
                                if (db.BusinessUnits.Count(a => a.name.Equals((string)obj["name"])) > 0)
                                {
                                    if (record.business_units_id != db.BusinessUnits.Single(a => a.name.Equals((string)obj["name"])).business_units_id)
                                    {
                                        logBuilder += "Business Unit changed to \"" + (db.BusinessUnits.Single(a => a.name.Equals((string)obj["name"])).name) + "\".";
                                    }
                                    record.business_units_id = (db.BusinessUnits.Single(a => a.name.Equals((string)obj["name"])).business_units_id);
                                } 
                            }
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
                            
                            if ((string)obj["name"] != "" && (string)obj["name"] != null)
                            {
                                if (db.BusinessUnits.Count(a => a.name.Equals((string)obj["name"])) > 0)
                                {
                                    return new PagedData(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, record.BusinessUnit.name, record.notes });
                                }
                                else
                                {
                                    String name = "";
                                    return new PagedData(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, name, record.notes });
                                }
                                
                            }
                            else
                            {
                                String name = "";
                                return new PagedData(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, name, record.notes });
                            }
                        }


                        JArray objs = (JArray)blob["rows"];
                        List<ServiceIDReq> list = new List<ServiceIDReq>();
                        List<Object> returnList = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ServiceIDReq record = db.ServiceIDReqs.Single(a => a.serviceid_req_id.Equals((int)objs[j]["serviceid_req_id"]));
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            if ((string)objs[j]["name"] != "" && (string)objs[j]["name"] != null)
                            {
                                if (db.BusinessUnits.Count(a => a.name.Equals((string)objs[j]["name"])) > 0)
                                {
                                    record.business_units_id = (db.BusinessUnits.Single(a => a.name.Equals((string)objs[j]["name"])).business_units_id);
                                }
                            }
                            record.product = (string)objs[j]["product"];
                            record.service_id = (string)objs[j]["service_id"];
                            record.notes = (string)objs[j]["notes"];

                            db.SubmitChanges();
                            list.Add(record);

                            if ((string)objs[j]["type"] != "" && (string)objs[j]["name"] != null)
                            {
                                if (db.BusinessUnits.Count(a => a.name.Equals((string)objs[j]["name"])) > 0)
                                {
                                    returnList.Add(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, record.BusinessUnit.name, record.notes });
                                }
                                else
                                {
                                    String name = "";
                                    returnList.Add(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, name, record.notes });
                                }
                                
                            }
                            else
                            {
                                String name = "";
                                returnList.Add(new { record.serviceid_req_id, record.project_id, record.@new, record.product, record.service_id, name, record.notes });
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

                            ServiceIDReq record = db.ServiceIDReqs.Single(a => a.serviceid_req_id.Equals((int)obj["serviceid_req_id"]));
                            logbuilder += "New: \"" + record.@new + "\"; Product: \"" + record.product + "\"; ServiceID: \"" + record.service_id + "\"; Business Unit: \"" + record.BusinessUnit.name + "\"; Notes: \"" + record.notes + "\".";
                                
                            db.ServiceIDReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Service ID Requirement deleted: " + logbuilder;
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
                            ServiceIDReq record = db.ServiceIDReqs.Single(a => a.serviceid_req_id.Equals((int)objs[j]["serviceid_req_id"]));
                            db.ServiceIDReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("ServiceIDReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }

            
        }
    }
}