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
    /// Summary description for GetHardwareRequirements
    /// </summary>
    public class GetHardwareRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<HardwareRequirement> q = db.HardwareRequirements;

            string username = context.Request.Params.Get("user_name");
            string filter = context.Request.Params.Get("project_id");

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            string readOnly = context.Request.Params.Get("read_only");

            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }
            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        if (!isNull(filter))
                        {
                            q = q.Where(a => a.project_id == int.Parse(filter));

                            return new PagedData(q.Select(a => new
                            {
                                a.hardware_req_id,
                                a.description,
                                a.cost_per_item,
                                a.quantity,
                                a.total_item_cost,
                                a.target_delivery,
                                a.target_order_date,
                                a.actual_delivery_date,
                                a.actual_order_date,
                                a.requirement_type,
                                a.number_of_sites
                            }));
                        }
                        else
                        {
                            return new PagedData("GetHardwareRequirements expects a project_id");
                        }
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            HardwareRequirement record = new HardwareRequirement();

                            record.project_id = int.Parse(filter);
                            record.description = "";
                            record.cost_per_item = "";
                            record.quantity = 0;
                            record.total_item_cost = "";
                            record.target_order_date = "";
                            record.target_delivery = "";
                            record.actual_delivery_date = "";
                            record.actual_order_date = "";
                            record.number_of_sites = 0;
                            try
                            {
                                record.requirement_type = (string)obj["requirement_type"];
                            }
                            catch (Exception)
                            {
                                record.requirement_type = "One Time Charges";
                            }
                            db.HardwareRequirements.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(record);
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<HardwareRequirement> list = new List<HardwareRequirement>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                HardwareRequirement record = new HardwareRequirement();

                                record.project_id = int.Parse(filter);
                                record.description = "";
                                record.cost_per_item = "";
                                record.quantity = 0;
                                record.total_item_cost = "";
                                record.target_order_date = "";
                                record.target_delivery = "";
                                record.actual_delivery_date = "";
                                record.actual_order_date = "";
                                try
                                {
                                    record.requirement_type = (string)objs["requirement_type"];
                                }
                                catch (Exception)
                                {
                                    record.requirement_type = "One Time Charges";
                                }
                                record.number_of_sites = 0;

                                db.HardwareRequirements.InsertOnSubmit(record);
                                db.SubmitChanges();
                                list.Add(record);
                            }
                            return new PagedData(list);
                        }
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            HardwareRequirement record = db.HardwareRequirements.Single(a => a.hardware_req_id.Equals((int)obj["hardware_req_id"]));
                            record.description = (string)obj["description"];
                            record.cost_per_item = obj["cost_per_item"] == null ? "0" : (string)obj["cost_per_item"];
                            record.quantity = obj["quantity"] == null ? 0 : (int)obj["quantity"];
                            record.number_of_sites = obj["number_of_sites"] == null ? 0 : (int)obj["number_of_sites"];
                            try
                            {
                                record.total_item_cost = "$" + (record.quantity * double.Parse(record.cost_per_item) * record.number_of_sites);
                            }
                            catch (Exception)
                            {
                                record.total_item_cost = "";
                            }
                            record.target_order_date = obj["target_order_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["target_order_date"]) : ((string)obj["target_order_date"] == null ? "" : (string)obj["target_order_date"]);
                            record.target_delivery = obj["target_delivery"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["target_delivery"]) : ((string)obj["target_delivery"] == null ? "" : (string)obj["target_delivery"]);
                            record.actual_delivery_date = obj["actual_delivery_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["actual_delivery_date"]) : ((string)obj["actual_delivery_date"] == null ? "" : (string)obj["actual_delivery_date"]);
                            record.actual_order_date = obj["actual_order_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["actual_order_date"]) : ((string)obj["actual_order_date"] == null ? "" : (string)obj["actual_order_date"]);
                            try
                            {
                                record.requirement_type = (string)obj["requirement_type"];
                            }
                            catch (Exception)
                            {
                                record.requirement_type = "One Time Charges";
                            }
                            db.SubmitChanges();
                            return new PagedData(record);
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<HardwareRequirement> list = new List<HardwareRequirement>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                HardwareRequirement record = db.HardwareRequirements.Single(a => a.hardware_req_id.Equals((int)objs["hardware_req_id"]));
                                record.description = (string)objs["description"];
                                record.cost_per_item = objs["cost_per_item"] == null ? "0" : (string)objs["cost_per_item"];
                                record.quantity = objs["quantity"] == null ? 0 : (int)objs["quantity"];
                                record.number_of_sites = objs["number_of_sites"] == null ? 0 : (int)objs["number_of_sites"];
                                try
                                {
                                    record.total_item_cost = "$" + (record.quantity * double.Parse(record.cost_per_item) * record.number_of_sites);
                                }
                                catch (Exception)
                                {
                                    record.total_item_cost = "";
                                }
                                record.target_order_date = objs["target_order_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["target_order_date"]) : ((string)objs["target_order_date"] == null ? "" : (string)objs["target_order_date"]);
                                record.target_delivery = objs["target_delivery"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["target_delivery"]) : ((string)objs["target_delivery"] == null ? "" : (string)objs["target_delivery"]);
                                record.actual_delivery_date = objs["actual_delivery_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["actual_delivery_date"]) : ((string)objs["actual_delivery_date"] == null ? "" : (string)objs["actual_delivery_date"]);
                                record.actual_order_date = objs["actual_order_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["actual_order_date"]) : ((string)objs["actual_order_date"] == null ? "" : (string)objs["actual_order_date"]);
                                try
                                {
                                    record.requirement_type = (string)objs["requirement_type"];
                                }
                                catch (Exception)
                                {
                                    record.requirement_type = "One Time Charges";
                                }
                                db.SubmitChanges();
                            }
                            return new PagedData(list);
                        }
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            HardwareRequirement record = db.HardwareRequirements.Single(a => a.hardware_req_id.Equals((int)obj["hardware_req_id"]));
                            db.HardwareRequirements.DeleteOnSubmit(record);
                            db.SubmitChanges();
                            return new PagedData("Hardware Rec Deleted");
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<HardwareRequirement> list = new List<HardwareRequirement>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                JObject obj = (JObject)blob["rows"];
                                HardwareRequirement record = db.HardwareRequirements.Single(a => a.hardware_req_id.Equals((int)obj["hardware_req_id"]));
                                db.HardwareRequirements.DeleteOnSubmit(record);
                                db.SubmitChanges();
                            }
                            return new PagedData("Hardware Recs Deleted");
                        }
                        
                    }
                default:
                    return new PagedData("Error: Unsupported Http Request:  " + context.Request.RequestType + " not recognized", false);
            }
        }


        public string convertToProperDate(String incomingDate)
        {
            //incomming date looks like: "YYYY-MM-DDT00:00:00"
            string year = incomingDate.Substring(0, 4);
            string month = incomingDate.Substring(5, 2);
            string day = incomingDate.Substring(8, 2);
            return month + "/" + day + "/" + year;
        }
    }
}