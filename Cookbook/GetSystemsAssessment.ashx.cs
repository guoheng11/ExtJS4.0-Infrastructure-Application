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
    /// Summary description for GetSystemsAssessment
    /// </summary>
    public class GetSystemsAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<SystemsAssessment> q = db.SystemsAssessments;

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
                                a.systems_req_id,
                                a.description,
                                a.Contact.name,
                                a.billed_hours,
                                a.booked_hours,
                                a.target_start,
                                a.target_complete,
                                a.scheduled_start,
                                a.scheduled_complete,
                                a.actual_complete
                            }));
                        }
                        else
                        {
                            return new PagedData("GetSystemsAssessment expects a project_id");
                        }
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            SystemsAssessment record = new SystemsAssessment();

                            record.project_id = int.Parse(filter);
                            record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                            record.Contact.name = "Test Guy";
                            record.description = "";
                            record.billed_hours = "";
                            record.booked_hours = "";
                            record.target_start = "";
                            record.target_complete = "";
                            record.scheduled_start = "";
                            record.scheduled_complete = "";
                            record.actual_complete = "";
                            db.SystemsAssessments.InsertOnSubmit(record);
                            db.SubmitChanges();



                            //return new PagedData(record);
                            q = q.Where(a => a.project_id == int.Parse(filter) && a.systems_req_id == record.systems_req_id);

                            return new PagedData(q.Select(a => new
                            {
                                a.systems_req_id,
                                a.description,
                                a.Contact.name,
                                a.billed_hours,
                                a.booked_hours,
                                a.target_start,
                                a.target_complete,
                                a.scheduled_start,
                                a.scheduled_complete,
                                a.actual_complete
                            }));
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<SystemsAssessment> list = new List<SystemsAssessment>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                SystemsAssessment record = new SystemsAssessment();

                                record.project_id = int.Parse(filter);
                                record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                                record.description = "";
                                record.billed_hours = "";
                                record.booked_hours = "";
                                record.target_start = "";
                                record.target_complete = "";
                                record.scheduled_start = "";
                                record.scheduled_complete = "";
                                record.actual_complete = "";
                                db.SystemsAssessments.InsertOnSubmit(record);
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
                            SystemsAssessment record = db.SystemsAssessments.Single(a => a.systems_req_id.Equals((int)obj["systems_req_id"]));

                            try
                            {
                                record.Contact = db.Contacts.Single(a => a.name.Equals((string)obj["name"]));
                            }
                            catch (Exception)
                            {
                                record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                            }
                            record.description = (string)obj["description"];
                            record.billed_hours = (string)obj["billed_hours"];
                            record.booked_hours = (string)obj["booked_hours"];
                            record.target_start = obj["target_start"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["target_start"]) : ((string)obj["target_start"] == null ? "" : (string)obj["target_start"]);
                            record.target_complete = obj["target_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["target_complete"]) : ((string)obj["target_complete"] == null ? "" : (string)obj["target_complete"]);
                            record.scheduled_start = obj["scheduled_start"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["scheduled_start"]) : ((string)obj["scheduled_start"] == null ? "" : (string)obj["scheduled_start"]);
                            record.scheduled_complete = obj["scheduled_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["scheduled_complete"]) : ((string)obj["scheduled_complete"] == null ? "" : (string)obj["scheduled_complete"]);
                            record.actual_complete = obj["actual_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["actual_complete"]) : ((string)obj["actual_complete"] == null ? "" : (string)obj["actual_complete"]);
                            db.SubmitChanges();

                            //return new PagedData(record);
                            q = q.Where(a => a.project_id == int.Parse(filter) && a.systems_req_id == record.systems_req_id);

                            return new PagedData(q.Select(a => new
                            {
                                a.systems_req_id,
                                a.description,
                                a.Contact.name,
                                a.billed_hours,
                                a.booked_hours,
                                a.target_start,
                                a.target_complete,
                                a.scheduled_start,
                                a.scheduled_complete,
                                a.actual_complete
                            }));
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<SystemsAssessment> list = new List<SystemsAssessment>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                SystemsAssessment record = db.SystemsAssessments.Single(a => a.systems_req_id.Equals((int)objs["systems_req_id"]));

                                try
                                {
                                    record.Contact = db.Contacts.Single(a => a.name.Equals((string)objs["name"]));
                                }
                                catch (Exception)
                                {
                                    record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                                }
                                record.description = (string)objs["description"];
                                record.billed_hours = (string)objs["billed_hours"];
                                record.booked_hours = (string)objs["booked_hours"];
                                record.target_start = objs["target_start"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["target_start"]) : ((string)objs["target_start"] == null ? "" : (string)objs["target_start"]);
                                record.target_complete = objs["target_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["target_complete"]) : ((string)objs["target_complete"] == null ? "" : (string)objs["target_complete"]);
                                record.scheduled_start = objs["scheduled_start"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["scheduled_start"]) : ((string)objs["scheduled_start"] == null ? "" : (string)objs["scheduled_start"]);
                                record.scheduled_complete = objs["scheduled_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["scheduled_complete"]) : ((string)objs["scheduled_complete"] == null ? "" : (string)objs["scheduled_complete"]);
                                record.actual_complete = objs["actual_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["actual_complete"]) : ((string)objs["actual_complete"] == null ? "" : (string)objs["actual_complete"]);
                                db.SubmitChanges();

                                list.Add(record);
                            }
                            return new PagedData(list);
                        }
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            SystemsAssessment record = db.SystemsAssessments.Single(a => a.systems_req_id.Equals((int)obj["systems_req_id"]));
                            db.SystemsAssessments.DeleteOnSubmit(record);
                            db.SubmitChanges();
                            return new PagedData("SystemsAssessment Rec Deleted");
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<SystemsAssessment> list = new List<SystemsAssessment>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                JObject obj = (JObject)blob["rows"];
                                SystemsAssessment record = db.SystemsAssessments.Single(a => a.systems_req_id.Equals((int)obj["systems_req_id"]));
                                db.SystemsAssessments.DeleteOnSubmit(record);
                                db.SubmitChanges();
                            }
                            return new PagedData("SystemsAssessment Recs Deleted");
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