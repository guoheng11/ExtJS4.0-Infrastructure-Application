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
    /// Summary description for GetProjectDeliverables
    /// </summary>
    public class GetProjectDeliverables : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectDeliverable> q = db.ProjectDeliverables;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id.Equals(int.Parse(filter)));
            }
            else
            {
                return new PagedData("GetProjectDeliverables.ashx expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.project_deliverable_id, a.deliverable_text, a.project_id, a.category }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectDeliverable record = new ProjectDeliverable();
                            record.project_id = int.Parse(filter);
                            record.deliverable_text = (string)obj["deliverable_text"];
                            record.category = (string)obj["category"];

                            db.ProjectDeliverables.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(new { record.project_deliverable_id, record.project_id, record.deliverable_text, record.category });  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectDeliverable record = new ProjectDeliverable();
                            record.project_id = int.Parse(filter);
                            record.deliverable_text = (string)objs[j]["deliverable_text"];
                            record.category = (string)objs[j]["category"];

                            db.SubmitChanges();

                            db.ProjectDeliverables.InsertOnSubmit(record);
                            list.Add(new { record.project_deliverable_id, record.project_id, record.deliverable_text, record.category });
                        }

                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectDeliverable record = db.ProjectDeliverables.Single(a => a.project_deliverable_id.Equals((int)obj["project_deliverable_id"]));
                            record.deliverable_text = (string)obj["deliverable_text"];
                            record.category = (string)obj["category"];

                            db.SubmitChanges();

                            return new PagedData(new { record.project_deliverable_id, record.project_id, record.deliverable_text, record.category });  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectDeliverable record = db.ProjectDeliverables.Single(a => a.project_deliverable_id.Equals((int)objs[j]["project_deliverable_id"]));
                            record.deliverable_text = (string)objs[j]["deliverable_text"];
                            record.category = (string)objs[j]["category"];

                            db.SubmitChanges();
                            list.Add(new { record.project_deliverable_id, record.project_id, record.deliverable_text, record.category });
                        }

                        return new PagedData(list);
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectDeliverable record = db.ProjectDeliverables.Single(a => a.project_deliverable_id.Equals((int)obj["project_deliverable_id"]));
                            db.ProjectDeliverables.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectDeliverable record = db.ProjectDeliverables.Single(a => a.project_deliverable_id.Equals((int)objs[j]["project_deliverable_id"]));
                            db.ProjectDeliverables.DeleteOnSubmit(record);
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