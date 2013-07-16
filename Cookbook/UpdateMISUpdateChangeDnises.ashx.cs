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
    /// Summary description for UpdateMISUpdateChangeDnises
    /// </summary>
    public class UpdateMISUpdateChangeDnises : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string readOnly = context.Request.Params.Get("read_only");
            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }

            IQueryable<MISUpdateDNI> q = db.MISUpdateDNIs;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        string filter = context.Request.Params.Get("mis_update_id");
                        if (!isNull(filter))
                        {
                            q = q.Where(a => a.mis_update_id.Equals(int.Parse(filter)) && a.remove_from.Length > 1 && a.reroute_to.Length > 1);
                        }

                        return new PagedData(q.Select(a => new { a.mis_updatednis_id, a.mis_update_id, a.dnis, a.remove_from, a.platform, a.description, a.effective_date, a.reroute_to, a.platform_from }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            MISUpdateDNI record = new MISUpdateDNI();
                            record.mis_update_id = (int)obj["mis_update_id"];
                            record.dnis = (String)obj["dnis"];
                            record.remove_from = (String)obj["remove_from"];
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
                            record.description = (String)obj["description"];
                            record.effective_date = (String)obj["effective_date"];
                            record.reroute_to = (String)obj["reroute_to"];
                            if (obj["platform_from"].GetType() == typeof(JValue))
                                record.platform_from = (String)obj["platform_from"];
                            else
                            {
                                string platforms = (String)((JArray)obj["platform_from"])[0];
                                for (int i = 1; i < ((JArray)obj["platform_from"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)obj["platform_from"])[i];
                                }
                                record.platform_from = platforms;
                            }

                            db.MISUpdateDNIs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(new { record.mis_updatednis_id, record.mis_update_id, record.dnis, record.remove_from, record.platform, record.description, record.effective_date, record.reroute_to, record.platform_from });
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            MISUpdateDNI record = new MISUpdateDNI();
                            record.mis_update_id = (int)objs[j]["mis_update_id"];
                            record.dnis = (String)objs[j]["dnis"];
                            record.remove_from = (String)objs[j]["remove_from"];
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
                            record.description = (String)objs[j]["description"];
                            record.effective_date = (String)objs[j]["effective_date"];
                            record.reroute_to = (String)objs[j]["reroute_to"];
                            if (objs[j]["platform_from"].GetType() == typeof(JValue))
                                record.platform_from = (String)objs[j]["platform_from"];
                            else
                            {
                                string platforms = (String)((JArray)objs[j]["platform_from"])[0];
                                for (int i = 1; i < ((JArray)objs[j]["platform_from"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)objs[j]["platform_from"])[i];
                                }
                                record.platform_from = platforms;
                            }

                            db.MISUpdateDNIs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            list.Add(new { record.mis_updatednis_id, record.mis_update_id, record.dnis, record.remove_from, record.platform, record.description, record.effective_date, record.reroute_to, record.platform_from });
                        }

                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            MISUpdateDNI record = db.MISUpdateDNIs.Single(a => a.mis_updatednis_id.Equals((int)obj["mis_updatednis_id"]));
                            record.dnis = (String)obj["dnis"];
                            if (obj["remove_from"] != null) record.remove_from = (String)obj["remove_from"];
                            //record.platform = (string)obj["platform"];

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
                            record.description = (String)obj["description"];
                            record.effective_date = (String)obj["effective_date"];
                            record.reroute_to = (String)obj["reroute_to"];
                            if (obj["platform_from"].GetType() == typeof(JValue))
                                record.platform_from = (String)obj["platform_from"];
                            else
                            {
                                string platforms = (String)((JArray)obj["platform_from"])[0];
                                for (int i = 1; i < ((JArray)obj["platform_from"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)obj["platform_from"])[i];
                                }
                                record.platform_from = platforms;
                            }

                            db.SubmitChanges();

                            return new PagedData(new { record.mis_updatednis_id, record.mis_update_id, record.dnis, record.remove_from, record.platform, record.description, record.effective_date, record.reroute_to, record.platform_from });
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            MISUpdateDNI record = db.MISUpdateDNIs.Single(a => a.mis_updatednis_id.Equals((int)objs[j]["mis_updatednis_id"]));
                            record.dnis = (String)objs[j]["dnis"];
                            record.remove_from = (String)objs[j]["remove_from"];
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
                            record.description = (String)objs[j]["description"];
                            record.effective_date = (String)objs[j]["effective_date"];
                            record.reroute_to = (String)objs[j]["reroute_to"];
                            if (objs[j]["platform_from"].GetType() == typeof(JValue))
                                record.platform_from = (String)objs[j]["platform_from"];
                            else
                            {
                                string platforms = (String)((JArray)objs[j]["platform_from"])[0];
                                for (int i = 1; i < ((JArray)objs[j]["platform_from"]).Count; i++)
                                {
                                    platforms = platforms + ", " + (String)((JArray)objs[j]["platform_from"])[i];
                                }
                                record.platform_from = platforms;
                            }

                            list.Add(new { record.mis_updatednis_id, record.mis_update_id, record.dnis, record.remove_from, record.platform, record.description, record.effective_date, record.reroute_to, record.platform_from });
                        }

                        db.SubmitChanges();

                        return new PagedData(list);
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            MISUpdateDNI record = db.MISUpdateDNIs.Single(a => a.mis_updatednis_id.Equals((int)obj["mis_updatednis_id"]));
                            db.MISUpdateDNIs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("dnis deleted");
                        }

                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            MISUpdateDNI record = db.MISUpdateDNIs.Single(a => a.mis_updatednis_id.Equals((int)objs[j]["mis_updatednis_id"]));
                            db.MISUpdateDNIs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();

                        return new PagedData("dnises deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}