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
    /// Summary description for GetRoutingRequirements
    /// </summary>
    public class GetAccessUSANReqs : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<AccessUSANReq> q = db.AccessUSANReqs;

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
                            List<Object> recordsToReturn = new List<Object>();
                            List<AccessUSANReq> tableRecs = q.ToList();

                            foreach (AccessUSANReq currentRec in tableRecs)
                            {
                                string[] table_permission_required = currentRec.table_permission_required.Split(',');
                                for (int i = 0; i < table_permission_required.Length; i++)
                                    table_permission_required[i] = table_permission_required[i].Trim();

                                recordsToReturn.Add(new
                                {
                                    currentRec.project_id,
                                    currentRec.accessusan_req_id,
                                    currentRec.@new,
                                    currentRec.name,
                                    currentRec.email,
                                    currentRec.login_id,
                                    currentRec.report_access_required,
                                    currentRec.read_only_permission,
                                    table_permission_required
                                });
                            }

                            return new PagedData(recordsToReturn);

                            /*return new PagedData(q.Select(a => new
                            {
                                a.project_id,
                                a.accessusan_req_id,
                                a.@new,
                                a.name,
                                a.email,
                                a.login_id,
                                a.table_permission_required,
                                a.report_access_required,
                                a.read_only_permission
                            }));*/
                        }
                        else
                        {
                            return new PagedData("GetAccessUSANReqs expects a project_id");
                        }
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            AccessUSANReq record = new AccessUSANReq();

                            record.project_id = int.Parse(filter);
                            record.@new = false;
                            record.name = "Test Guy";
                            record.email = "";
                            record.login_id = "";
                            record.table_permission_required = "";
                            record.report_access_required = "";
                            record.read_only_permission = false;
                            db.AccessUSANReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            q = q.Where(a => a.project_id == int.Parse(filter) && a.accessusan_req_id == record.accessusan_req_id);

                            return new PagedData(q.Select(a => new
                            {
                                a.project_id,
                                a.accessusan_req_id,
                                a.@new,
                                a.name,
                                a.email,
                                a.login_id,
                                a.table_permission_required,
                                a.report_access_required,
                                a.read_only_permission
                            }));
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<AccessUSANReq> list = new List<AccessUSANReq>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                AccessUSANReq record = new AccessUSANReq();

                                record.project_id = int.Parse(filter);
                                record.@new = false;
                                record.name = "Test Guy";
                                record.email = "";
                                record.login_id = "";
                                record.table_permission_required = "";
                                record.report_access_required = "";
                                record.read_only_permission = false;

                                db.AccessUSANReqs.InsertOnSubmit(record);
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
                            AccessUSANReq record = db.AccessUSANReqs.Single(a => a.accessusan_req_id.Equals((int)obj["accessusan_req_id"]));
                            try
                            {
                                record.name = db.Contacts.Single(a => a.name.Equals((string)obj["name"])).name;
                            }
                            catch (Exception)
                            {
                                record.name = db.Contacts.Single(a => a.name.Equals("Test Guy")).name;
                            }
                            record.@new = (bool)obj["new"];
                            record.email = (string)obj["email"];
                            record.login_id = (string)obj["login_id"];
                            record.report_access_required = (string)obj["report_access_required"];
                            record.read_only_permission = (bool)obj["read_only_permission"];
                            List<string> table_permission_required = new List<string>();
                            if (obj["table_permission_required"] != null)
                            {
                                if (obj["table_permission_required"].GetType() == typeof(JValue))
                                {
                                    if ((string)obj["table_permission_required"] != "" && (string)obj["table_permission_required"] != null)
                                    {
                                        table_permission_required.Add((string)obj["table_permission_required"]);
                                    }
                                }
                                else
                                {
                                    if (((JArray)obj["table_permission_required"]).Count > 0)
                                    {
                                        String tables = "";
                                        for (int i = 0; i < ((JArray)obj["table_permission_required"]).Count; i++)
                                        {
                                            tables += (string)((JArray)obj["table_permission_required"])[i];
                                            table_permission_required.Add((string)((JArray)obj["table_permission_required"])[i]);
                                            if ((i + 1) < ((JArray)obj["table_permission_required"]).Count)
                                            {
                                                tables += ", ";
                                            }
                                        }
                                        record.table_permission_required = tables;
                                    }
                                }
                            }

                            db.SubmitChanges();

                            q = q.Where(a => a.project_id == int.Parse(filter) && a.accessusan_req_id == record.accessusan_req_id);

                            return new PagedData(q.Select(a => new
                            {
                                a.project_id,
                                a.accessusan_req_id,
                                a.@new,
                                a.name,
                                a.email,
                                a.login_id,
                                table_permission_required,
                                //a.table_permission_required,
                                a.report_access_required,
                                a.read_only_permission
                            }));
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<AccessUSANReq> list = new List<AccessUSANReq>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                AccessUSANReq record = db.AccessUSANReqs.Single(a => a.accessusan_req_id.Equals((int)objs["accessusan_req_id"]));
                                try
                                {
                                    record.name = db.Contacts.Single(a => a.name.Equals((string)objs["name"])).name;
                                }
                                catch (Exception)
                                {
                                    record.name = db.Contacts.Single(a => a.name.Equals("Test Guy")).name;
                                }
                                record.@new = (bool)objs["new"];
                                record.email = (string)objs["email"];
                                record.login_id = (string)objs["login_id"];
                                record.report_access_required = (string)objs["report_access_required"];
                                record.read_only_permission = (bool)objs["read_only_permission"];
                                record.table_permission_required = (string)objs["table_permission_required"];
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
                            AccessUSANReq record = db.AccessUSANReqs.Single(a => a.accessusan_req_id.Equals((int)obj["accessusan_req_id"]));
                            db.AccessUSANReqs.DeleteOnSubmit(record);
                            db.SubmitChanges();
                            return new PagedData("AU Assessment Rec Deleted");
                        }
                        else
                        {
                            JArray objs = (JArray)blob["rows"];
                            List<AccessUSANReq> list = new List<AccessUSANReq>();
                            for (int j = 0; j < objs.Count; j++)
                            {
                                JObject obj = (JObject)blob["rows"];
                                AccessUSANReq record = db.AccessUSANReqs.Single(a => a.accessusan_req_id.Equals((int)obj["accessusan_req_id"]));
                                db.AccessUSANReqs.DeleteOnSubmit(record);
                                db.SubmitChanges();
                            }
                            return new PagedData("AU Assessment Recs Deleted");
                        }
                    }
                default:
                    return new PagedData("Error: Unsupported Http Request:  " + context.Request.RequestType + " not recognized", false);
            }
        }
    }
}