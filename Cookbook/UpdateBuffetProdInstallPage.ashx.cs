using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{

    public class UpdateBuffetProdInstallPage : DatabaseHandler
    {

        String comment = "comments:";
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");

            if (!isNull(filter))
            {
                try
                {
                    //check to see if there already is a prod installation buffet entry with this project id
                    if (db.ProdInstallationBuffets.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var wiping = db.ProdInstallationBuffets.Where(a => a.project_id.Equals(int.Parse(filter)));
                        db.ProdInstallationBuffets.DeleteAllOnSubmit(wiping);
                        db.SubmitChanges();
                    }
                    

                    ProdInstallationBuffet newEntry = new ProdInstallationBuffet();
                    newEntry.project_id = int.Parse(filter);
                    if (blob["viewBuffetProdInstallDate"] != null)
                    {
                        newEntry.date = (string)blob["viewBuffetProdInstallDate"];
                    }
                    if (blob["viewBuffetProdInstallConferenceStart"] != null)
                    {
                        newEntry.conference_start = (string)blob["viewBuffetProdInstallConferenceStart"];
                    }
                    if (blob["viewBuffetProdInstallConferenceBridge"] != null)
                    {
                        newEntry.conference_bridge = (string)blob["viewBuffetProdInstallConferenceBridge"];
                    }
                    if (blob["buffetprodinstallNodes"] != null)
                    {
                        if (blob["buffetprodinstallNodes"].Type.ToString().Equals("String"))
                        {
                            newEntry.nodes = (string)blob["buffetprodinstallNodes"];
                        }
                        else
                        {
                            JArray nodes = (JArray)blob["buffetprodinstallNodes"];
                            if (nodes.Count > 0)
                            {
                                for (int i = 0; i < blob["buffetprodinstallNodes"].Count(); i++)
                                {
                                    newEntry.nodes += (string)blob["buffetprodinstallNodes"][i] + ", ";
                                }
                                newEntry.nodes = newEntry.nodes.Substring(0, newEntry.nodes.Length - 2);
                            }
                        }
                    }
                    if (blob["buffetprodinstallComments"] != null)
                    {
                        newEntry.comments = (string)blob["buffetprodinstallComments"];
                    }
                    if (blob["viewBuffetProdInstallPostMaintenanceMasterProject"] != null)
                    {
                        if (blob["viewBuffetProdInstallPostMaintenanceMasterProject"].Type.ToString().Equals("String"))
                        {
                            //SINGLE INSTANCE
                            newEntry.post_maintenance_notification = (string)blob["viewBuffetProdInstallPostMaintenanceMasterProject"];
                        }
                        else
                        {
                            //ARRAY OF EMAILS
                            JArray emails = (JArray)blob["viewBuffetProdInstallPostMaintenanceMasterProject"];
                            if (emails.Count > 0)
                            {
                                for (int i = 0; i < emails.Count; i++)
                                {
                                    newEntry.post_maintenance_notification += (string)emails[i] + "; ";
                                }
                                newEntry.post_maintenance_notification = newEntry.post_maintenance_notification.Substring(0, newEntry.post_maintenance_notification.Length - 2);
                            }
                        }
                    }
                    db.ProdInstallationBuffets.InsertOnSubmit(newEntry);
                    db.SubmitChanges();
                }
                catch (Exception e)
                {
                    return new PagedData("Error: " + e.Message + e.Source + e.StackTrace + e.TargetSite + e.InnerException + e.HelpLink);
                }

                try
                {
                    //Staging Folders
                    if (blob["buffetProdInstallStagingFolderLink"] != null)
                    {
                        var wipingStaging = db.StagingFolders.Where(a => a.project_id.Equals(int.Parse(filter)) && a.is_buffet.Equals(true));
                        db.StagingFolders.DeleteAllOnSubmit(wipingStaging);
                        db.SubmitChanges();

                        if (blob["buffetProdInstallStagingFolderLink"].Type.ToString().Equals("String"))
                        {
                            StagingFolder newStagingEntry = new StagingFolder();
                            newStagingEntry.project_id = int.Parse(filter);
                            newStagingEntry.is_buffet = true;
                            newStagingEntry.folder = (string)blob["buffetProdInstallStagingFolderLink"];
                            if (blob["buffetProdInstallStagingNotes"] != null)
                            {
                                newStagingEntry.notes = (string)blob["buffetProdInstallStagingNotes"];
                            }
                            db.StagingFolders.InsertOnSubmit(newStagingEntry);
                            db.SubmitChanges();
                        }
                        else
                        {
                            for (int i = 0; i < blob["buffetProdInstallStagingFolderLink"].Count(); i++)
                            {
                                StagingFolder newStagingEntry = new StagingFolder();
                                newStagingEntry.project_id = int.Parse(filter);
                                newStagingEntry.is_buffet = true;
                                newStagingEntry.folder = (string)blob["buffetProdInstallStagingFolderLink"][i];
                                if (blob["buffetProdInstallStagingNotes"][i] != null)
                                {
                                    newStagingEntry.notes = (string)blob["buffetProdInstallStagingNotes"][i];
                                }
                                db.StagingFolders.InsertOnSubmit(newStagingEntry);
                            }
                            db.SubmitChanges();
                        }
                    }
                    else
                    {
                        try
                        {
                            var wipingStaging = db.StagingFolders.Where(a => a.project_id.Equals(int.Parse(filter)) && a.is_buffet.Equals(true));
                            db.StagingFolders.DeleteAllOnSubmit(wipingStaging);
                            db.SubmitChanges();
                        }
                        catch (Exception e)
                        {
                            comment += "[Exception caught when removing existing staging folders: " + e.Message + "]";
                        }
                        comment += ("[No Staging Folders Submitted]");
                    }
                }
                catch (Exception e)
                {
                    return new PagedData("Error: " + e.Message + e.Source + e.StackTrace + e.TargetSite + e.InnerException + e.HelpLink);
                }

            }
        return new PagedData("success! "+comment);
        }
    }
}