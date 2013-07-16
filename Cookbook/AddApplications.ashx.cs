using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddApplications
    /// </summary>
    public class AddApplications : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddApplications.ashx without parameters");

            Application app = new Application();
            int existingAppID = -1;

            for (int i = 0; i < context.Request.Params.Count; i++)
            {
                var currentParam = context.Request.Params.GetKey(i).Trim();
                var currentParamData = context.Request.Params.Get(i).Trim();

                switch (currentParam)
                {
                    case "application":
                        {
                            app.base_name = currentParamData;
                            app.name = app.base_name + ".APP";
                            break;
                        }
                    case "product":
                        {
                            app.Product = currentParamData;
                            break;
                        }
                    case "division":
                        {
                            app.Division = currentParamData;
                            break;
                        }
                    case "platform":
                        {
                            app.Platform = currentParamData;
                            break;
                        }
                    case "serviceid":
                        {
                            app.ServiceID = currentParamData;
                            break;
                        }
                    case "applications_id":
                        {
                            if (currentParamData != "add")
                            {
                                existingAppID = Convert.ToInt32(currentParamData);
                            }
                            break;
                        }
                    default:
                        break;
                }
            }

            if (existingAppID < 0)
            {
                db.Applications.InsertOnSubmit(app);
            }
            else
            {
                if (db.Applications.Count(a => a.applications_id.Equals(existingAppID)) > 0)
                {
                    Application existingApp = db.Applications.First(a => a.applications_id.Equals(existingAppID));
                    existingApp.base_name = app.base_name;
                    existingApp.name = app.name;
                    existingApp.Product = app.Product;
                    existingApp.Division = app.Division;
                    existingApp.Platform = app.Platform;
                    existingApp.ServiceID = app.ServiceID;
                }
                else
                {
                    return new PagedData("Could not find the existing app to edit!");
                }
            }
            
                db.SubmitChanges();

            return new PagedData("");
        }
    }
}