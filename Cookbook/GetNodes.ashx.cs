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
    /// Summary description for GetNodes
    /// </summary>
    public class GetNodes : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Node> q = db.Nodes;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.node_id, a.node1 }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            Node record = new Node();
                            record.node1 = (string)obj["node1"];

                            db.Nodes.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Node> list = new List<Node>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Node record = new Node();
                            record.node1 = (string)objs[j]["node1"];

                            db.Nodes.InsertOnSubmit(record);
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

                            Node record = db.Nodes.Single(a => a.node_id.Equals((int)obj["node_id"]));
                            record.node1 = (string)obj["node1"];

                            db.SubmitChanges();

                            return new PagedData(record);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Node> list = new List<Node>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Node record = db.Nodes.Single(a => a.node_id.Equals((int)objs[j]["node_id"]));
                            record.node1 = (string)objs[j]["node1"];
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

                            Node record = db.Nodes.Single(a => a.node_id.Equals((int)obj["node_id"]));
                            db.Nodes.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            Node record = db.Nodes.Single(a => a.node_id.Equals((int)objs[j]["node_id"]));
                            db.Nodes.DeleteOnSubmit(record);
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