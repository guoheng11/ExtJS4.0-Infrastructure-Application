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
    /// Summary description for GetAssumptions
    /// </summary>
    public class GetAssumptions : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Assumption> q = db.Assumptions;
            //string user = context.Request.Params.Get("user_name");

            //q = q.Where(a => a.user_name.Equals(user));

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.assumptions_id, a.assumption1, a.user_name, a.business_unit, a.category }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            Assumption record = new Assumption();
                            record.assumption1 = (string)obj["assumption1"];
                            record.user_name = (string)obj["user_name"];
                            record.business_unit = (string)obj["business_unit"];
                            record.category = (string)obj["category"];

                            db.Assumptions.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Assumption> list = new List<Assumption>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Assumption record = new Assumption();
                            record.assumption1 = (string)objs[j]["assumption1"];
                            record.user_name = (string)objs[j]["user_name"];
                            record.business_unit = (string)objs[j]["business_unit"];
                            record.category = (string)objs[j]["category"];

                            db.Assumptions.InsertOnSubmit(record);
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

                            Assumption record = db.Assumptions.Single(a => a.assumptions_id.Equals((int)obj["assumptions_id"]));
                            record.assumption1 = (string)obj["assumption1"];
                            if (obj["user_name"] != null) { record.user_name = (string)obj["user_name"]; }
                            record.business_unit = (string)obj["business_unit"];
                            record.category = (string)obj["category"];

                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Assumption> list = new List<Assumption>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Assumption record = db.Assumptions.Single(a => a.assumptions_id.Equals((int)objs[j]["assumptions_id"]));
                            record.assumption1 = (string)objs[j]["assumption1"];
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

                            Assumption record = db.Assumptions.Single(a => a.assumptions_id.Equals((int)obj["assumptions_id"]));
                            db.Assumptions.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Assumption record = db.Assumptions.Single(a => a.assumptions_id.Equals((int)objs[j]["assumptions_id"]));
                            db.Assumptions.DeleteOnSubmit(record);
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