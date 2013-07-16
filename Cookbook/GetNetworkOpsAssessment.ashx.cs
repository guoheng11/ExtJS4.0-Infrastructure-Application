using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    public class GetNetworkOpsAssessment : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<SWDAssessment> q = db.SWDAssessments;

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
                            q = q.Where(a => a.project_id == int.Parse(filter) && (
                                a.AssessmentType.type == "Network OPS"
                                ));

                            return new PagedData(q.Select(a => new
                            {
                                a.project_id,
                                a.Contact.name,
                                a.AssessmentType.type,
                                a.hours,
                                a.action,
                                a.requested_start_date,
                                a.requested_complete,
                                a.scheduled_start_date,
                                a.scheduled_complete,
                                a.actual_complete,
                                a.booked_hours,
                                a.swd_assessment_id
                            }));
                        }
                        else
                        {
                            return new PagedData("GetNetworkOpsAssessment expects a project_id");
                        }
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            SWDAssessment record = new SWDAssessment();

                            record.project_id = int.Parse(filter);
                            record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                            record.Contact.name = "Test Guy";
                            record.action = "";
                            record.hours = "";
                            record.booked_hours = "";
                            record.requested_start_date = "";
                            record.requested_complete = "";
                            record.scheduled_start_date = "";
                            record.scheduled_complete = "";
                            record.actual_complete = "";
                            try
                            {
                                record.assessment_type_id = db.AssessmentTypes.Single(a => a.type == (string)obj["type"]).assessment_type_id;
                            }
                            catch (Exception)
                            {
                                record.assessment_type_id = db.AssessmentTypes.Single(a => a.type == "Network OPS").assessment_type_id;
                            }
                            db.SWDAssessments.InsertOnSubmit(record);
                            db.SubmitChanges();

                            q = q.Where(a => a.project_id == int.Parse(filter) && a.swd_assessment_id == record.swd_assessment_id);

                            return new PagedData(q.Select(a => new
                            {
                                a.swd_assessment_id,
                                a.AssessmentType.type,
                                a.action,
                                a.Contact.name,
                                a.hours,
                                a.booked_hours,
                                a.requested_start_date,
                                a.requested_complete,
                                a.scheduled_start_date,
                                a.scheduled_complete,
                                a.actual_complete
                            }));
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<SWDAssessment> list = new List<SWDAssessment>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                SWDAssessment record = new SWDAssessment();

                                record.project_id = int.Parse(filter);
                                record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                                record.Contact.name = "Test Guy";
                                record.action = "";
                                record.hours = "";
                                record.booked_hours = "";
                                record.requested_start_date = "";
                                record.requested_complete = "";
                                record.scheduled_start_date = "";
                                record.scheduled_complete = "";
                                record.actual_complete = "";
                                try
                                {
                                    record.assessment_type_id = db.AssessmentTypes.Single(a => a.type == (string)objs["type"]).assessment_type_id;
                                }
                                catch (Exception)
                                {
                                    record.assessment_type_id = db.AssessmentTypes.Single(a => a.type == "Network OPS").assessment_type_id;
                                }

                                db.SWDAssessments.InsertOnSubmit(record);
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
                            SWDAssessment record = db.SWDAssessments.Single(a => a.swd_assessment_id.Equals((int)obj["swd_assessment_id"]));
                            try
                            {
                                record.Contact = db.Contacts.Single(a => a.name.Equals((string)obj["name"]));
                            }
                            catch (Exception)
                            {
                                record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                            }
                            record.action = (string)obj["action"];
                            record.hours = (string)obj["hours"];
                            record.booked_hours = (string)obj["booked_hours"];
                            record.requested_start_date = obj["requested_start_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["requested_start_date"]) : ((string)obj["requested_start_date"] == null ? "" : (string)obj["requested_start_date"]);
                            record.requested_complete = obj["requested_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["requested_complete"]) : ((string)obj["requested_complete"] == null ? "" : (string)obj["requested_complete"]);
                            record.scheduled_start_date = obj["scheduled_start_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["scheduled_start_date"]) : ((string)obj["scheduled_start_date"] == null ? "" : (string)obj["scheduled_start_date"]);
                            record.scheduled_complete = obj["scheduled_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["scheduled_complete"]) : ((string)obj["scheduled_complete"] == null ? "" : (string)obj["scheduled_complete"]);
                            record.actual_complete = obj["actual_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)obj["actual_complete"]) : ((string)obj["actual_complete"] == null ? "" : (string)obj["actual_complete"]);
                            db.SubmitChanges();

                            q = q.Where(a => a.project_id == int.Parse(filter) && a.swd_assessment_id == record.swd_assessment_id);

                            return new PagedData(q.Select(a => new
                            {
                                a.swd_assessment_id,
                                a.AssessmentType.type,
                                a.action,
                                a.Contact.name,
                                a.hours,
                                a.booked_hours,
                                a.requested_start_date,
                                a.requested_complete,
                                a.scheduled_start_date,
                                a.scheduled_complete,
                                a.actual_complete
                            }));
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<SWDAssessment> list = new List<SWDAssessment>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                SWDAssessment record = db.SWDAssessments.Single(a => a.swd_assessment_id.Equals((int)objs["swd_assessment_id"]));
                                try
                                {
                                    record.Contact = db.Contacts.Single(a => a.name.Equals((string)objs["name"]));
                                }
                                catch (Exception)
                                {
                                    record.Contact = db.Contacts.Single(a => a.name.Equals("Test Guy"));
                                }
                                record.action = (string)objs["action"];
                                record.hours = (string)objs["hours"];
                                record.booked_hours = (string)objs["booked_hours"];
                                record.requested_start_date = objs["requested_start_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["requested_start_date"]) : ((string)objs["requested_start_date"] == null ? "" : (string)objs["requested_start_date"]);
                                record.requested_complete = objs["requested_complete"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["requested_complete"]) : ((string)objs["requested_complete"] == null ? "" : (string)objs["requested_complete"]);
                                record.scheduled_start_date = objs["scheduled_start_date"].ToString().Contains("T00:00:00") ? convertToProperDate((string)objs["scheduled_start_date"]) : ((string)objs["scheduled_start_date"] == null ? "" : (string)objs["scheduled_start_date"]);
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
                            SWDAssessment record = db.SWDAssessments.Single(a => a.swd_assessment_id.Equals((int)obj["swd_assessment_id"]));
                            db.SWDAssessments.DeleteOnSubmit(record);
                            db.SubmitChanges();
                            return new PagedData("Network OPS Assessment Rec Deleted");
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<SWDAssessment> list = new List<SWDAssessment>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                JObject obj = (JObject)blob["rows"];
                                SWDAssessment record = db.SWDAssessments.Single(a => a.swd_assessment_id.Equals((int)obj["swd_assessment_id"]));
                                db.SWDAssessments.DeleteOnSubmit(record);
                                db.SubmitChanges();
                            }
                            return new PagedData("Network OPS Recs Deleted");
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