using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{

    public class RFQReportView : DatabaseHandler
    {


        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
            IQueryable<ProjectInformation> q = db.ProjectInformations;
            var jsonSerializer = new JsonSerializer();
            String blob = (String)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            String[] projectsToFind = blob.Split('|');


            List<ProjectReports> returnProjects = new List<ProjectReports>
            {

            };

            foreach (string currentCriteria in projectsToFind)
            {
                returnProjects = getRecords(returnProjects, currentCriteria, db);
            }
            return new PagedData(returnProjects, true);
        }

        public List<ProjectReports> getRecords(List<ProjectReports> returnProjects, string type, CookDBDataContext db)
        {
            List<Int32> projectIDsAlreadyAdded = new List<int>();

            //REDFLAG: CHECK PI.CURRENT_PROJECT_STATUS TO SEE IF IT HAS BEEN POPULATED AND NOT NULL IF SO THEN PULL FROM THAT INSTEAD OF MOST RECENT PROJECT STATUS!!!!!!!!
            var allProjectsCurrentProjectStatus = db.ProjectInformations.Where(a => a.current_project_status.ToLower().Trim().Equals(type.ToLower().Trim()));
            foreach (ProjectInformation currProj in allProjectsCurrentProjectStatus)
            {
                var thisProjId = currProj.project_id;
                if (!projectIDsAlreadyAdded.Contains(thisProjId))
                {
                    if (currProj.current_project_status.ToLower().Trim().Equals(type.ToLower().Trim()))
                    {
                        projectIDsAlreadyAdded.Add(thisProjId);
                        var pi = db.ProjectInformations.First(a => a.project_id.Equals(thisProjId));
                        var PMcontacts = db.ProjectContacts.Where(a => a.project_id.Equals(thisProjId) && a.type.Equals("USAN Dev PM")).ToList();
                        string PMs = "";
                        foreach (ProjectContact currContact in PMcontacts)
                        {
                            PMs += currContact.Contact.name + ",";
                        }
                        if (PMs.Length > 2)
                        {
                            PMs = PMs.Substring(0, PMs.Length - 1);
                        }
                        var TCcontacts = db.ProjectContacts.Where(a => a.project_id.Equals(thisProjId) && a.type.Equals("USAN TC")).ToList();
                        string TCs = "";
                        foreach (ProjectContact currContact in TCcontacts)
                        {
                            TCs += currContact.Contact.name + ",";
                        }
                        if (TCs.Length > 2)
                        {
                            TCs = TCs.Substring(0, TCs.Length - 1);
                        }
                        string[] TC2 = TCs.Split(',');
                        string visio = "N/A";
                        if (pi.doc_visio != "0" && pi.doc_vui == "0")
                        {
                            visio = "Visio";
                        }
                        else if ((pi.doc_visio != "0" && pi.doc_vui != "0") && (pi.doc_visio != null && pi.doc_vui != null))
                        {
                            visio = "VUI/Visio";
                        }
                        else if (pi.doc_visio == "0" && pi.doc_vui != "0")
                        {
                            visio = "VUI";
                        }
                        string expedite = "False";
                        if (pi.expedite == true)
                        {
                            expedite = "True";
                        }
                        else if (pi.expedite == false)
                        {
                            expedite = "False";
                        }
                        returnProjects.Add(new ProjectReports
                        {
                            exp = expedite,
                            project_number = pi.project_number,
                            project_name = pi.project_name,
                            project_id = pi.project_id,
                            project_status = type,
                            business_unit = (pi.primary_business_unit == "" || pi.primary_business_unit == null) ? "N/A" : pi.primary_business_unit,
                            tc = TCs.Length < 2 ? "N/A" : TCs,
                            tc2 = TC2,
                            pm = PMs.Length < 2 ? "N/A" : PMs,
                            flow = visio,
                            quote_due = pi.quote_loe_due_date,
                            rfq_recd = pi.rfq_loe_recv_date,
                            req_prod = pi.requested_prod_date,
                            req_uat = pi.requested_uat_date
                        });
                    }
                }
            }
            //at this point, all projects with a currentProjectStatus of 'type' will be in the returnProjects list as well as the projectIDsAlreadyAdded list
            //so we don't have to worry about the projectStatus being pulled for the same project again

            //get all projects that have a status type of x (from old project status way) 
            var allProjects = db.ProjectStatus.Where(a => a.status_type_id.Equals(db.StatusTypes.First(b => b.type.ToLower().Trim().Equals(type.ToLower().Trim())).status_type_id)).OrderByDescending(x => x.date);
            foreach (ProjectStatus currProj in allProjects)
            {
                //pull the current project's full status history, and if the most recent status is "project on hold" then add to return projects list
                var thisProjId = currProj.project_id;
                if (!projectIDsAlreadyAdded.Contains(thisProjId))
                {
                    var allStatusFromThisProj = db.ProjectStatus.Where(a => a.project_id.Equals(thisProjId)).OrderByDescending(x => x.date).ToList();
                    if (allStatusFromThisProj[0].status_type_id.Equals(db.StatusTypes.First(b => b.type.Equals(type)).status_type_id))
                    {
                        //just a redundant check to make sure the status is equal to the type passed in
                        if (allStatusFromThisProj[0].StatusType.type.ToLower().Trim().Equals(type.ToLower().Trim()))
                        {
                            //adding a check to see if this project has a current_status set (in PI), to ignore the project!
                            if (db.ProjectInformations.Single(a => a.project_id.Equals(thisProjId)).current_project_status != null)
                            {
                                //the current_status to the currProj has been set, and is not equal to the type passed in, so lets ignore it!!
                            }
                            else
                            {
                                projectIDsAlreadyAdded.Add(thisProjId);
                                var pi = db.ProjectInformations.First(a => a.project_id.Equals(thisProjId));
                                var PMcontacts = db.ProjectContacts.Where(a => a.project_id.Equals(thisProjId) && a.type.Equals("USAN Dev PM")).ToList();
                                string PMs = "";
                                foreach (ProjectContact currContact in PMcontacts)
                                {
                                    PMs += currContact.Contact.name + ",";
                                }
                                if (PMs.Length > 2)
                                {
                                    PMs = PMs.Substring(0, PMs.Length - 1);
                                }
                                var TCcontacts = db.ProjectContacts.Where(a => a.project_id.Equals(thisProjId) && a.type.Equals("USAN TC")).ToList();
                                string TCs = "";
                                foreach (ProjectContact currContact in TCcontacts)
                                {
                                    TCs += currContact.Contact.name + ",";
                                }
                                if (TCs.Length > 2)
                                {
                                    TCs = TCs.Substring(0, TCs.Length - 1);
                                }
                                string[] TC2 = TCs.Split(',');
                                string visio = "N/A";
                                if (pi.doc_visio != "0" && pi.doc_vui == "0")
                                {
                                    visio = "Visio";
                                }
                                else if ((pi.doc_visio != "0" && pi.doc_vui != "0") && (pi.doc_visio != null && pi.doc_vui != null))
                                {
                                    visio = "VUI/Visio";
                                }
                                else if (pi.doc_visio == "0" && pi.doc_vui != "0")
                                {
                                    visio = "VUI";
                                }
                                string expedite = "False";
                                if (pi.expedite == true)
                                {
                                    expedite = "True";
                                }
                                else if (pi.expedite == false)
                                {
                                    expedite = "False";
                                }
                                returnProjects.Add(new ProjectReports
                                {
                                    exp = expedite,
                                    project_number = pi.project_number,
                                    project_name = pi.project_name,
                                    project_id = pi.project_id,
                                    project_status = type,
                                    business_unit = (pi.primary_business_unit == "" || pi.primary_business_unit == null) ? "N/A" : pi.primary_business_unit,
                                    tc = TCs.Length < 2 ? "N/A" : TCs,
                                    tc2 = TC2,
                                    pm = PMs.Length < 2 ? "N/A" : PMs,
                                    flow = visio,
                                    quote_due = pi.quote_loe_due_date,
                                    rfq_recd = pi.rfq_loe_recv_date,
                                    req_prod = pi.requested_prod_date,
                                    req_uat = pi.requested_uat_date
                                });
                            }
                        }
                    }
                }
            }
            return returnProjects;
        }
    }

    public class ProjectReports
    {
        public string exp;
        public string project_name;
        public int project_id;
        public string project_status;
        public string project_number;
        public string business_unit;
        public string tc;
        public string[] tc2;
        public string pm;
        public string flow;
        public string rfq_recd;
        public string quote_due;
        public string req_uat;
        public string req_prod;
        
        public ProjectReports()
        {

        }
    }
}
