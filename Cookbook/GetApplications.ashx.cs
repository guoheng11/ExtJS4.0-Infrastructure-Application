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
    /// Summary description for GetApplications
    /// </summary>
    public class GetApplications : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Application> q = db.Applications;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        string filter = context.Request.Params.Get("name");
                        if (!isNull(filter))
                        {
                            q = q.Where(a => a.name.IndexOf(filter) != -1);
                        }

                        return new PagedData(q.Select(a => new { a.applications_id, a.name, a.base_name, a.Product, a.Division, a.Platform, a.ServiceID }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject app = (JObject)blob["rows"];

                            Application newApp = new Application();
                            newApp.name = (string)app["name"];
                            newApp.base_name = (string)app["base_name"];
                            newApp.Product = app["Product"] == null ? "" : (string)app["Product"];
                            newApp.Division = app["Division"] == null ? "" : (string)app["Division"];
                            newApp.Platform = app["Platform"] == null ? "" : (string)app["Platform"];
                            newApp.ServiceID = app["ServiceID"] == null ? "" : (string)app["ServiceID"];

                            db.Applications.InsertOnSubmit(newApp);
                            db.SubmitChanges();

                            return new PagedData(newApp);  //JsonConvert.SerializeObject(newApp));
                        }

                        JArray apps = (JArray)blob["rows"];
                        List<Application> list = new List<Application>();
                        for (int j = 0; j < apps.Count; j++)
                        {        
                            Application newApp = new Application();
                            newApp.name = (string)apps[j]["name"];
                            newApp.base_name = (string)apps[j]["base_name"];
                            newApp.Product = apps[j]["Product"] == null ? "" : (string)apps[j]["Product"];
                            newApp.Division = apps[j]["Division"] == null ? "" : (string)apps[j]["Division"];
                            newApp.Platform = apps[j]["Platform"] == null ? "" : (string)apps[j]["Platform"];
                            newApp.ServiceID = apps[j]["ServiceID"] == null ? "" : (string)apps[j]["ServiceID"];

                            db.Applications.InsertOnSubmit(newApp);
                            list.Add(newApp);
                        }

                        db.SubmitChanges();

                        DocumentationReq doc = new DocumentationReq();


                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject app = (JObject)blob["rows"];

                            Application app2 = db.Applications.Single(a => a.applications_id.Equals((int)app["applications_id"]));
                            app2.base_name = (string)app["base_name"];
                            app2.name = (string)app["name"];
                            app2.Product = app["Product"] == null ? "" : (string)app["Product"];
                            app2.Division = app["Division"] == null ? "" : (string)app["Division"];
                            app2.Platform = app["Platform"] == null ? "" : (string)app["Platform"];
                            app2.ServiceID = app["ServiceID"] == null ? "" : (string)app["ServiceID"];

                            db.SubmitChanges();

                            return new PagedData(app2);
                        }

                        JArray apps = (JArray)blob["rows"];
                        List<Application> list = new List<Application>();
                        for (int j = 0; j < apps.Count; j++)
                        {
                            Application app2 = db.Applications.Single(a => a.applications_id.Equals((int)apps[j]["applications_id"]));
                            app2.base_name = (string)apps[j]["base_name"];
                            app2.name = (string)apps[j]["name"];
                            app2.Product = apps[j]["Product"] == null ? "" : (string)apps[j]["Product"];
                            app2.Division = apps[j]["Division"] == null ? "" : (string)apps[j]["Division"];
                            app2.Platform = apps[j]["Platform"] == null ? "" : (string)apps[j]["Platform"];
                            app2.ServiceID = apps[j]["ServiceID"] == null ? "" : (string)apps[j]["ServiceID"];


                            db.SubmitChanges();
                            list.Add(app2);
                        }

                        return new PagedData(list);
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject app = (JObject)blob["rows"];

                            Application app2 = db.Applications.Single(a => a.applications_id.Equals((int)app["applications_id"]));
                            db.Applications.DeleteOnSubmit(app2);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray apps = (JArray)blob["rows"];
                        for (int j = 0; j < apps.Count; j++)
                        {
                            Application app2 = db.Applications.Single(a => a.applications_id.Equals((int)apps[j]["applications_id"]));
                            db.Applications.DeleteOnSubmit(app2);
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