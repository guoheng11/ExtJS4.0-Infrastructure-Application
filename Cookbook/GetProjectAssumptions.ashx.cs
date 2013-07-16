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
    /// Summary description for GetProjectAssumptions
    /// </summary>
    public class GetProjectAssumptions : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectAssumption> q = db.ProjectAssumptions;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id.Equals(int.Parse(filter)));
            }
            else
            {
                return new PagedData("GetProjectAssumptions.ashx expects a project_id");
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

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.project_assumptions_id, a.assumption_text, a.project_id, a.category, a.sort_order }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectAssumption record = new ProjectAssumption();
                            record.project_id = int.Parse(filter);
                            record.assumption_text = (string)obj["assumption_text"];
                            record.category = (string)obj["category"];

                            db.ProjectAssumptions.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(new { record.project_assumptions_id, record.project_id, record.assumption_text, record.category });  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectAssumption record = new ProjectAssumption();
                            record.project_id = int.Parse(filter);
                            record.assumption_text = (string)objs[j]["assumption_text"];
                            record.category = (string)objs[j]["category"];

                            db.SubmitChanges();

                            db.ProjectAssumptions.InsertOnSubmit(record);
                            list.Add(new { record.project_assumptions_id, record.project_id, record.assumption_text, record.category });
                        }

                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectAssumption record = db.ProjectAssumptions.Single(a => a.project_assumptions_id.Equals((int)obj["project_assumptions_id"]));
                            record.assumption_text = (string)obj["assumption_text"];
                            record.category = (string)obj["category"];
                            try
                            {
                                if (obj["sort_order"] != null)
                                {
                                    record.sort_order = (short)obj["sort_order"];
                                }
                                else
                                {
                                    record.sort_order = null;
                                }
                            }
                            catch (Exception)
                            {
                                record.sort_order = null;
                            }

                            db.SubmitChanges();

                            return new PagedData(new { record.project_assumptions_id, record.project_id, record.assumption_text, record.category, record.sort_order });  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectAssumption record = db.ProjectAssumptions.Single(a => a.project_assumptions_id.Equals((int)objs[j]["project_assumptions_id"]));
                            record.assumption_text = (string)objs[j]["assumption_text"];
                            record.category = (string)objs[j]["category"];

                            db.SubmitChanges();
                            list.Add(new { record.project_assumptions_id, record.project_id, record.assumption_text, record.category });
                        }

                        return new PagedData(list);
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectAssumption record = db.ProjectAssumptions.Single(a => a.project_assumptions_id.Equals((int)obj["project_assumptions_id"]));
                            db.ProjectAssumptions.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectAssumption record = db.ProjectAssumptions.Single(a => a.project_assumptions_id.Equals((int)objs[j]["project_assumptions_id"]));
                            db.ProjectAssumptions.DeleteOnSubmit(record);
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