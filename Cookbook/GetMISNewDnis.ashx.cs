using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using Microsoft.CSharp;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetMISNewDnis
    /// </summary>
    public class GetMISNewDnis : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<MISNewDni> q = db.MISNewDnis;

            string filter = context.Request.Params.Get("mis_new_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.mis_new_id == int.Parse(filter));
            }
            else
            {
                return new PagedData("GetMISNewDnis expects an mis_new_id");
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

            int mis_new_id = int.Parse(filter);

            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new
                        {
                            a.mis_new_dnis_id,
                            a.mis_new_id,
                            a.dnis,
                            a.route_to,
                            a.remove_from,
                            a.reroute_to,
                            a.platform,
                            a.description,
                            a.effective_date
                        }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            MISNewDni record = new MISNewDni();

                            record.mis_new_id = mis_new_id;
                            record.dnis = (string)obj["dnis"];
                            record.route_to = (string)obj["route_to"];
                            if (obj["platform"].GetType() == typeof(JValue))
                                record.platform = (String)obj["platform"];
                            else
                            {
                                string platforms = (String)((JArray)obj["platform"])[0];
                                for (int i = 1; i < ((JArray)obj["platform"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)obj["platform"])[i];
                                }
                                record.platform = platforms;
                            }
                            record.description = (string)obj["description"];
                            record.effective_date = (string)obj["effective_date"];

                            db.MISNewDnis.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<MISNewDni> list = new List<MISNewDni>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            MISNewDni record = new MISNewDni();
                            record.mis_new_id = mis_new_id;
                            record.dnis = (string)objs[j]["dnis"];
                            record.route_to = (string)objs[j]["route_to"];
                            if (objs[j]["platform"].GetType() == typeof(JValue))
                                record.platform = (String)objs[j]["platform"];
                            else
                            {
                                string platforms = (String)((JArray)objs[j]["platform"])[0];
                                for (int i = 1; i < ((JArray)objs[j]["platform"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)objs[j]["platform"])[i];
                                }
                                record.platform = platforms;
                            }
                            record.description = (string)objs[j]["description"];
                            record.effective_date = (string)objs[j]["effective_date"];

                            db.MISNewDnis.InsertOnSubmit(record);
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

                            MISNewDni record = db.MISNewDnis.Single(a => a.mis_new_dnis_id.Equals((int)obj["mis_new_dnis_id"]));
                            record.dnis = (string)obj["dnis"];
                            record.route_to = (string)obj["route_to"];
                            if (obj["platform"].GetType() == typeof(JValue))
                                record.platform = (String)obj["platform"];
                            else
                            {
                                string platforms = (String)((JArray)obj["platform"])[0];
                                for (int i = 1; i < ((JArray)obj["platform"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)obj["platform"])[i];
                                }
                                record.platform = platforms;
                            }
                            record.description = (string)obj["description"];
                            record.effective_date = (string)obj["effective_date"];

                            db.SubmitChanges();

                            return new PagedData(record);
                        }


                        JArray objs = (JArray)blob["rows"];
                        List<MISNewDni> list = new List<MISNewDni>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            MISNewDni record = db.MISNewDnis.Single(a => a.mis_new_dnis_id.Equals((int)objs[j]["mis_new_dnis_id"]));
                            record.dnis = (string)objs[j]["dnis"];
                            record.route_to = (string)objs[j]["route_to"];
                            if (objs[j]["platform"].GetType() == typeof(JValue))
                                record.platform = (String)objs[j]["platform"];
                            else
                            {
                                string platforms = (String)((JArray)objs[j]["platform"])[0];
                                for (int i = 1; i < ((JArray)objs[j]["platform"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)objs[j]["platform"])[i];
                                }
                                record.platform = platforms;
                            }
                            record.description = (string)objs[j]["description"];
                            record.effective_date = (string)objs[j]["effective_date"];

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

                            MISNewDni record = db.MISNewDnis.Single(a => a.mis_new_dnis_id.Equals((int)obj["mis_new_dnis_id"]));
                            db.MISNewDnis.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }


                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            MISNewDni record = db.MISNewDnis.Single(a => a.mis_new_dnis_id.Equals((int)objs[j]["mis_new_dnis_id"]));
                            db.MISNewDnis.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("MISNewDnis deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}