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
    /// Summary description for GetCategories
    /// </summary>
    public class GetCategories : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Category> q = db.Categories;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.category_id, a.category1 }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            Category record = new Category();
                            record.category1 = (string)obj["category1"];

                            db.Categories.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Category> list = new List<Category>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Category record = new Category();
                            record.category1 = (string)objs[j]["category1"];

                            db.Categories.InsertOnSubmit(record);
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

                            Category record = db.Categories.Single(a => a.category_id.Equals((int)obj["category_id"]));
                            record.category1 = (string)obj["category1"];

                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Category> list = new List<Category>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Category record = db.Categories.Single(a => a.category_id.Equals((int)objs[j]["category_id"]));
                            record.category1 = (string)objs[j]["category1"];
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

                            Category record = db.Categories.Single(a => a.category_id.Equals((int)obj["category_id"]));
                            db.Categories.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Category record = db.Categories.Single(a => a.category_id.Equals((int)objs[j]["category_id"]));
                            db.Categories.DeleteOnSubmit(record);
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