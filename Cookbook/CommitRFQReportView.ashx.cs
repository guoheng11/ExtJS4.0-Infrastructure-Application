using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Globalization;

namespace Cookbook
{

    public class CommitRFQReportView : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
            var jsonSerializer = new JsonSerializer();
            List<String> failedProjects = new List<string>();
            List<String> succeededProjects = new List<string>();
            List<String> lockedProjects = new List<string>();
            string username = context.Request.Params.Get("user_name");
            switch (context.Request.RequestType)
            {
                case "PUT":
                    {
                        return new PagedData("fake sync complete! records should no longer be dirty you cheating bastard", true);
                    }
                case "POST":
                    {
                        String type = "";
                        JArray blob = (JArray)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
                        foreach (JObject currentRecord in blob)
                        {
                            var currentProject = db.ProjectInformations.Single(a => a.project_id.Equals((Int32)currentRecord["project_id"]));
                            if ((currentProject.locked != true) || (currentProject.locked == true && (DateTime.Now - DateTime.Parse(currentProject.last_time)).TotalSeconds > 75))
                            {
                                //expedite
                                type = "Expedite";
                                if (currentRecord["exp"] != null)
                                {
                                    try
                                    {
                                        if ((String)currentRecord["exp"] == "True")
                                        {
                                            if (!(currentProject.expedite == true))
                                            {
                                                currentProject.expedite = true;
                                            }
                                        }
                                        else if ((String)currentRecord["exp"] == "False")
                                        {
                                            if (!(currentProject.expedite == false))
                                            {
                                                currentProject.expedite = false;
                                            }
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //project name
                                type = "Project Name";
                                if (currentRecord["project_name"] != null)
                                {
                                    try
                                    {
                                        string temp = (String)currentRecord["project_name"];
                                        if (temp.ToLower().Trim() != currentProject.project_name.ToLower().Trim())
                                        {
                                            currentProject.project_name = (String)currentRecord["project_name"];
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //status
                                type = "Project Status";
                                if (currentRecord["project_status"] != null)
                                {
                                    try
                                    {
                                        string temp = (String)currentRecord["project_status"];

                                        if (db.StatusTypes.Count(a => a.type.Equals((String)currentRecord["project_status"])) > 0)
                                        {
                                            ProjectStatus status = new ProjectStatus();
                                            status.project_id = currentProject.project_id;
                                            status.date = DateTime.Now.ToString("s");
                                            status.status_type_id = db.StatusTypes.Single(a => a.type.Equals((String)currentRecord["project_status"])).status_type_id;
                                            db.ProjectStatus.InsertOnSubmit(status);
                                            db.SubmitChanges();

                                            //update project histories
                                            ProjectHistory history = new ProjectHistory();
                                            history.project_id = currentProject.project_id;
                                            history.user_name = username;
                                            history.date = DateTime.Now.ToString("s");
                                            history.description = "Project status changed to \"" + db.StatusTypes.Single(a => a.type.Equals((String)currentRecord["project_status"])).type + "\"";
                                            history.status_id = status.project_status_id;
                                            db.ProjectHistories.InsertOnSubmit(history);
                                            db.SubmitChanges();

                                            //update new current_project_status on pi table
                                            db.ProjectInformations.Single(a => a.project_id.Equals(currentProject.project_id)).current_project_status = (String)currentRecord["project_status"];
                                            db.SubmitChanges();

                                            succeededProjects.Add(currentProject.project_number + "'s " + type);
                                        }
                                        else
                                        {
                                            failedProjects.Add(currentProject.project_number + "'s " + type);
                                            continue;
                                        }
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //business unit
                                type = "Business Unit";
                                if (currentRecord["business_unit"] != null)
                                {
                                    try
                                    {
                                        string temp = (String)currentRecord["business_unit"];
                                        if (db.BusinessUnits.Count(a => a.name.Equals(temp)) > 0)
                                        {
                                            currentProject.primary_business_unit = temp;
                                        }
                                        else
                                        {
                                            failedProjects.Add(currentProject.project_number + "'s " + type);
                                            continue;
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //TC
                                type = "TC";
                                if (currentRecord["tc"] != null)
                                {
                                    try
                                    {
                                        string[] names = ((String)currentRecord["tc"]).Split(',');
                                        IQueryable<ProjectContact> q = db.ProjectContacts.Where(a => a.project_id.Equals(currentProject.project_id) && a.type.Equals("USAN TC"));
                                        foreach (String currName in names)
                                        {
                                            if (db.Contacts.Count(a => a.name.ToLower().Trim().Equals(currName.ToLower().Trim())) > 0)
                                            {
                                                int contact_id = db.Contacts.First(a => a.name.ToLower().Trim().Equals(currName.ToLower().Trim())).contact_id;
                                                ProjectContact contact = new ProjectContact();
                                                contact.Contact = db.Contacts.Single(a => a.contact_id.Equals(contact_id));
                                                contact.project_id = currentProject.project_id;
                                                contact.type = "USAN TC";
                                                db.ProjectContacts.InsertOnSubmit(contact);
                                            }
                                        }
                                        if (db.ProjectContacts.Count(a => a.project_id.Equals(currentProject.project_id) && a.type.Equals("USAN TC")) > 0)
                                        {
                                            var oldRecsToDelete = db.ProjectContacts.Where(a => a.project_id.Equals(currentProject.project_id) && a.type.Equals("USAN TC"));
                                            db.ProjectContacts.DeleteAllOnSubmit(oldRecsToDelete);
                                        }
                                        db.SubmitChanges();
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception e)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type + e.ToString());
                                        continue;
                                    }
                                }
                                //PM
                                type = "PM";
                                if (currentRecord["pm"] != null)
                                {
                                    try
                                    {
                                        string[] names = ((String)currentRecord["pm"]).Split(',');
                                        IQueryable<ProjectContact> q = db.ProjectContacts.Where(a => a.project_id.Equals(currentProject.project_id) && a.type.Equals("USAN Dev PM"));
                                        foreach (String currName in names)
                                        {
                                            if (db.Contacts.Count(a => a.name.ToLower().Trim().Equals(currName.ToLower().Trim())) > 0)
                                            {
                                                int contact_id = db.Contacts.First(a => a.name.ToLower().Trim().Equals(currName.ToLower().Trim())).contact_id;
                                                ProjectContact contact = new ProjectContact();
                                                contact.Contact = db.Contacts.Single(a => a.contact_id.Equals(contact_id));
                                                contact.project_id = currentProject.project_id;
                                                contact.type = "USAN Dev PM";
                                                db.ProjectContacts.InsertOnSubmit(contact);
                                            }
                                        }
                                        if (db.ProjectContacts.Count(a => a.project_id.Equals(currentProject.project_id) && a.type.Equals("USAN Dev PM")) > 0)
                                        {
                                            var oldRecsToDelete = db.ProjectContacts.Where(a => a.project_id.Equals(currentProject.project_id) && a.type.Equals("USAN Dev PM"));
                                            db.ProjectContacts.DeleteAllOnSubmit(oldRecsToDelete);
                                        }
                                        db.SubmitChanges();
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception e)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type + e.ToString());
                                        continue;
                                    }
                                }
                                //flow
                                type = "Flow";
                                if (currentRecord["flow"] != null)
                                {
                                    try
                                    {
                                        if ((String)currentRecord["flow"] == "N/A")
                                        {
                                            currentProject.doc_visio = "0";
                                            currentProject.doc_vui = "0";
                                        }
                                        else if ((String)currentRecord["flow"] == "Visio")
                                        {
                                            if (currentProject.doc_visio != "1" && currentProject.doc_visio != "2" && currentProject.doc_visio != "3")
                                            {
                                                currentProject.doc_visio = "1";
                                            }
                                            if (!(currentProject.doc_vui == "0"))
                                            {
                                                currentProject.doc_vui = "0";
                                            }
                                        }
                                        else if ((String)currentRecord["flow"] == "VUI")
                                        {
                                            if (!(currentProject.doc_visio == "0"))
                                            {
                                                currentProject.doc_visio = "0";
                                            }
                                            if (currentProject.doc_vui != "1" && currentProject.doc_vui != "2" && currentProject.doc_vui != "3")
                                            {
                                                currentProject.doc_vui = "1";
                                            }
                                        }
                                        else if ((String)currentRecord["flow"] == "VUI/Visio")
                                        {
                                            if (currentProject.doc_visio == "0" || currentProject.doc_visio == null)
                                            {
                                                currentProject.doc_visio = "1";
                                            }
                                            if (currentProject.doc_vui == "0" || currentProject.doc_vui == null)
                                            {
                                                currentProject.doc_vui = "1";
                                            }
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //rfq recd
                                type = "RFQ Rec\'d";
                                if (currentRecord["rfq_recd"] != null)
                                {
                                    try
                                    {
                                        string temp = (String)currentRecord["rfq_recd"];
                                        if (temp.ToLower().Trim() != currentProject.rfq_loe_recv_date.ToLower().Trim())
                                        {
                                            currentProject.rfq_loe_recv_date = temp;
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //quote due
                                type = "Quote Due";
                                if (currentRecord["quote_due"] != null)
                                {
                                    try
                                    {
                                        string temp = (String)currentRecord["quote_due"];
                                        if (temp.ToLower().Trim() != currentProject.quote_loe_due_date.ToLower().Trim())
                                        {
                                            currentProject.quote_loe_due_date = temp;
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //req uat
                                type = "Req UAT";
                                if (currentRecord["req_uat"] != null)
                                {
                                    try
                                    {
                                        string temp = (String)currentRecord["req_uat"];
                                        if (temp.ToLower().Trim() != currentProject.requested_uat_date.ToLower().Trim())
                                        {
                                            currentProject.requested_uat_date = temp;
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                                //req uat
                                type = "Req PROD";
                                if (currentRecord["req_prod"] != null)
                                {
                                    try
                                    {
                                        string temp = (String)currentRecord["req_prod"];
                                        if (temp.ToLower().Trim() != currentProject.requested_prod_date.ToLower().Trim())
                                        {
                                            currentProject.requested_prod_date = temp;
                                        }
                                        succeededProjects.Add(currentProject.project_number + "'s " + type);
                                    }
                                    catch (Exception)
                                    {
                                        failedProjects.Add(currentProject.project_number + "'s " + type);
                                        continue;
                                    }
                                }
                            }
                            else
                            {
                                if (!lockedProjects.Contains(currentProject.project_number))
                                {
                                    lockedProjects.Add(currentProject.project_number);
                                }
                                continue;
                            }
                            db.SubmitChanges();
                        }
                        break;
                    }
                default:
                    return new PagedData("Error: Unsupported Http Request:  " + context.Request.RequestType + " not recognized", false);
            }//endswitch

            
            ProjectReportViewReturn returnString = new ProjectReportViewReturn();

            for (int i = 0; i < succeededProjects.Count; i++)
            {
                if (i + 1 < succeededProjects.Count)
                {
                    returnString.succeededProjects += succeededProjects[i] + "; ";
                }
                else
                {
                    returnString.succeededProjects += succeededProjects[i];
                }
            }
            for (int i = 0; i < failedProjects.Count; i++)
            {
                if (i + 1 < failedProjects.Count)
                {
                    returnString.failedProjects += failedProjects[i] + "; ";
                }
                else
                {
                    returnString.failedProjects += failedProjects[i];
                }
            }
            for (int i = 0; i < lockedProjects.Count; i++)
            {
                if (i + 1 < lockedProjects.Count)
                {
                    returnString.lockedProjects += lockedProjects[i] + "; ";
                }
                else
                {
                    returnString.lockedProjects += lockedProjects[i];
                }
            }
            return new PagedData(returnString, true);
        }
    }

    public class ProjectReportViewReturn
    {
        public string succeededProjects;
        public string failedProjects;
        public string lockedProjects;

        public ProjectReportViewReturn()
        {

        }
    }
}