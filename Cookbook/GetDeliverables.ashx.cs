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
    /// Summary description for GetDeliverables
    /// </summary>
    public class GetDeliverables : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Deliverable> q = db.Deliverables;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        //string user_name = context.Request.Params.Get("user_name");
                        //q = q.Where(a => a.user_name.Equals(user_name));
                        return new PagedData(q.Select(a => new { a.deliverable_id, a.deliverable_text, a.user_name, a.business_unit, a.category }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            Deliverable record = new Deliverable();
                            record.deliverable_text = (string)obj["deliverable_text"];
                            record.user_name = (string)obj["user_name"];
                            record.business_unit = (string)obj["business_unit"];
                            record.category = (string)obj["category"];

                            db.Deliverables.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Deliverable> list = new List<Deliverable>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Deliverable record = new Deliverable();
                            record.deliverable_text = (string)objs[j]["deliverable_text"];
                            record.user_name = (string)objs[j]["user_name"];
                            record.business_unit = (string)objs[j]["business_unit"];
                            record.category = (string)objs[j]["category"];

                            db.Deliverables.InsertOnSubmit(record);
                            list.Add(record);
                        }

                        db.SubmitChanges();

                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            Deliverable record = db.Deliverables.Single(a => a.deliverable_id.Equals((int)obj["deliverable_id"]));
                            record.deliverable_text = (string)obj["deliverable_text"];
                            if (obj["user_name"] != null) { record.user_name = (string)obj["user_name"]; }
                            record.business_unit = (string)obj["business_unit"];
                            record.category = (string)obj["category"];

                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Deliverable> list = new List<Deliverable>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Deliverable record = db.Deliverables.Single(a => a.deliverable_id.Equals((int)objs[j]["deliverable_id"]));
                            record.deliverable_text = (string)objs[j]["deliverable_text"];
                            if (objs[j]["user_name"] != null) { record.user_name = (string)objs[j]["user_name"]; }
                            record.business_unit = (string)objs[j]["business_unit"];
                            record.category = (string)objs[j]["category"];

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

                            Deliverable record = db.Deliverables.Single(a => a.deliverable_id.Equals((int)obj["deliverable_id"]));
                            db.Deliverables.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Deliverable record = db.Deliverables.Single(a => a.deliverable_id.Equals((int)objs[j]["deliverable_id"]));
                            db.Deliverables.DeleteOnSubmit(record);
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