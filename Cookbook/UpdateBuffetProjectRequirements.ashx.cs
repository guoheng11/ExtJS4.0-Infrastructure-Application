using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    public class UpdateBuffetProjectRequirements : DatabaseHandler
    {
        String comment = "comments:";
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
            
            var jsonSerializer = new JsonSerializer();
            JArray blob = (JArray)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                //wipe out existing records
                
                var wiping = db.BuffetProjectRequirements.Where(a => a.project_id.Equals(int.Parse(filter)));
                db.BuffetProjectRequirements.DeleteAllOnSubmit(wiping);
                db.SubmitChanges();
                
                List<string> projectList = new List<string>();

                var masterProj = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));
                projectList.Add(masterProj.project_number);

                foreach (String a in blob)
                {
                    if (db.ProjectInformations.Count(b => b.project_number == a) > 0)
                    {
                        projectList.Add(a);
                    }
                }
                int req_type;

                List<string> singleInstanceReqs = new List<string>();
                List<string> multiInstanceReqs = new List<string>();

                List<string> singleInstanceProjs = new List<string>();
                List<string> multiInstanceProjs = new List<string>();

                //documentation
                /*
                req_type = 1;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));
                    
                    //get reqs for this current project and add to a list
                    var reqs = db.DocumentationReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach(DocumentationReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.filename))
                            {
                                singleInstanceReqs.Add(req.filename);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.filename))
                                {
                                    multiInstanceReqs.Add(req.filename);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.filename)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));
                */

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //application - appfile
                req_type = 2;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ApplicationReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ApplicationReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.app_file))
                            {
                                singleInstanceReqs.Add(req.app_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.app_file))
                                {
                                    multiInstanceReqs.Add(req.app_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.app_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //application - rptfile
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ApplicationReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ApplicationReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.rpt_file))
                            {
                                singleInstanceReqs.Add(req.rpt_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.rpt_file))
                                {
                                    multiInstanceReqs.Add(req.rpt_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.rpt_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //application - prmfile
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ApplicationReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ApplicationReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.prm_file))
                            {
                                singleInstanceReqs.Add(req.prm_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.prm_file))
                                {
                                    multiInstanceReqs.Add(req.prm_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.prm_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //application - instructions
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ApplicationReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ApplicationReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.prm_instructions))
                            {
                                singleInstanceReqs.Add(req.prm_instructions);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.prm_instructions))
                                {
                                    multiInstanceReqs.Add(req.prm_instructions);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.prm_instructions)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //table - xls/csv file
                req_type = 3;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.TableReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (TableReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.xls_csv_file))
                            {
                                singleInstanceReqs.Add(req.xls_csv_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.xls_csv_file))
                                {
                                    multiInstanceReqs.Add(req.xls_csv_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.xls_csv_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //table - def file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.TableReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (TableReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.def_file))
                            {
                                singleInstanceReqs.Add(req.def_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.def_file))
                                {
                                    multiInstanceReqs.Add(req.def_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.def_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //table - etm file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.TableReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (TableReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.etm_file))
                            {
                                singleInstanceReqs.Add(req.etm_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.etm_file))
                                {
                                    multiInstanceReqs.Add(req.etm_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.etm_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //scraper - exe file
                req_type = 4;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ScraperReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ScraperReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.exe_file))
                            {
                                singleInstanceReqs.Add(req.exe_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.exe_file))
                                {
                                    multiInstanceReqs.Add(req.exe_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.exe_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //scraper - pdb file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ScraperReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ScraperReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.pdb_file))
                            {
                                singleInstanceReqs.Add(req.pdb_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.pdb_file))
                                {
                                    multiInstanceReqs.Add(req.pdb_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.pdb_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //engine - exe file
                req_type = 5;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.EngineReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (EngineReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.exe_file))
                            {
                                singleInstanceReqs.Add(req.exe_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.exe_file))
                                {
                                    multiInstanceReqs.Add(req.exe_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.exe_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //engine - pdb file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.EngineReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (EngineReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.pdb_file))
                            {
                                singleInstanceReqs.Add(req.pdb_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.pdb_file))
                                {
                                    multiInstanceReqs.Add(req.pdb_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.pdb_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //manager - exe file
                req_type = 6;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ManagerReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ManagerReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.exe_file))
                            {
                                singleInstanceReqs.Add(req.exe_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.exe_file))
                                {
                                    multiInstanceReqs.Add(req.exe_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.exe_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //manager - exe file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ManagerReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ManagerReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.pdb_file))
                            {
                                singleInstanceReqs.Add(req.pdb_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.pdb_file))
                                {
                                    multiInstanceReqs.Add(req.pdb_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.pdb_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //grammar - abnf/grxml/tar/targz file
                req_type = 7;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.GrammarReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (GrammarReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.filename))
                            {
                                singleInstanceReqs.Add(req.filename);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.filename))
                                {
                                    multiInstanceReqs.Add(req.filename);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.filename)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //VXML - NDM grammar description
                req_type = 8;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.VXMLReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (VXMLReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.description))
                            {
                                singleInstanceReqs.Add(req.description);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.description))
                                {
                                    multiInstanceReqs.Add(req.description);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.description)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Backoffice DB - SQL File
                req_type = 9;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.BackofficeDBReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (BackofficeDBReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.sql_file))
                            {
                                singleInstanceReqs.Add(req.sql_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.sql_file))
                                {
                                    multiInstanceReqs.Add(req.sql_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.sql_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Backoffice DB - Instructions.txt
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.BackofficeDBReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (BackofficeDBReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.instructions))
                            {
                                singleInstanceReqs.Add(req.instructions);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.instructions))
                                {
                                    multiInstanceReqs.Add(req.instructions);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.instructions)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Backoffice Process - Exe file
                req_type = 10;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.BackofficeProcessReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (BackofficeProcessReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.exe_file))
                            {
                                singleInstanceReqs.Add(req.exe_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.exe_file))
                                {
                                    multiInstanceReqs.Add(req.exe_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.exe_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Backoffice Process - ini/cfg file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.BackofficeProcessReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (BackofficeProcessReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.config_file))
                            {
                                singleInstanceReqs.Add(req.config_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.config_file))
                                {
                                    multiInstanceReqs.Add(req.config_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.config_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Backoffice Process - instructions.txt
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.BackofficeProcessReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (BackofficeProcessReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.instructions))
                            {
                                singleInstanceReqs.Add(req.instructions);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.instructions))
                                {
                                    multiInstanceReqs.Add(req.instructions);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.instructions)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Backoffice Webservice - war file
                req_type = 11;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.BackofficeWebserviceReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (BackofficeWebserviceReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.war_file))
                            {
                                singleInstanceReqs.Add(req.war_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.war_file))
                                {
                                    multiInstanceReqs.Add(req.war_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.war_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Backoffice Webservice - tar.gz file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.BackofficeWebserviceReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (BackofficeWebserviceReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.tar_file))
                            {
                                singleInstanceReqs.Add(req.tar_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.tar_file))
                                {
                                    multiInstanceReqs.Add(req.tar_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.tar_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Config file - .tin/.dd.xml/.xsd file
                req_type = 12;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ConfigFileReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ConfigFileReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.filename))
                            {
                                singleInstanceReqs.Add(req.filename);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.filename))
                                {
                                    multiInstanceReqs.Add(req.filename);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.filename)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Config file - instructions file
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ConfigFileReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ConfigFileReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.instructions))
                            {
                                singleInstanceReqs.Add(req.instructions);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.instructions))
                                {
                                    multiInstanceReqs.Add(req.instructions);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.instructions)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //FaxForm - .tif/.map file
                req_type = 13;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.FaxFormReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (FaxFormReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.filename))
                            {
                                singleInstanceReqs.Add(req.filename);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.filename))
                                {
                                    multiInstanceReqs.Add(req.filename);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.filename)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //FaxForm - instructions
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.FaxFormReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (FaxFormReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.instructions))
                            {
                                singleInstanceReqs.Add(req.instructions);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.instructions))
                                {
                                    multiInstanceReqs.Add(req.instructions);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.instructions)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //FileXfer's NDM file
                req_type = 14;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.FileXferReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (FileXferReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.ndm_file))
                            {
                                singleInstanceReqs.Add(req.ndm_file);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.ndm_file))
                                {
                                    multiInstanceReqs.Add(req.ndm_file);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.ndm_file)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //TTS Functionality - call volume
                req_type = 15;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.TTSFunctionalityReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (TTSFunctionalityReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.call_volume))
                            {
                                singleInstanceReqs.Add(req.call_volume);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.call_volume))
                                {
                                    multiInstanceReqs.Add(req.call_volume);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.call_volume)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //TNT Functionality - call volume
                req_type = 16;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.TNTFunctionalityReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (TNTFunctionalityReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.call_volume))
                            {
                                singleInstanceReqs.Add(req.call_volume);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.call_volume))
                                {
                                    multiInstanceReqs.Add(req.call_volume);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.call_volume)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Speech rec - call volume
                req_type = 17;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.SpeechRecognitionReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (SpeechRecognitionReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.call_volume))
                            {
                                singleInstanceReqs.Add(req.call_volume);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.call_volume))
                                {
                                    multiInstanceReqs.Add(req.call_volume);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.call_volume)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //UUI - call volume
                req_type = 18;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.UUIReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (UUIReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.call_volume))
                            {
                                singleInstanceReqs.Add(req.call_volume);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.call_volume))
                                {
                                    multiInstanceReqs.Add(req.call_volume);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.call_volume)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Service ID - product
                req_type = 20;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ServiceIDReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ServiceIDReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.product))
                            {
                                singleInstanceReqs.Add(req.product);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.product))
                                {
                                    multiInstanceReqs.Add(req.product);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.product)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Service ID - serviceid
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.ServiceIDReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (ServiceIDReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.service_id))
                            {
                                singleInstanceReqs.Add(req.service_id);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.service_id))
                                {
                                    multiInstanceReqs.Add(req.service_id);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.service_id)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

                //clear out the lists
                singleInstanceReqs = new List<string>();
                multiInstanceReqs = new List<string>();

                singleInstanceProjs = new List<string>();
                multiInstanceProjs = new List<string>();
                //Other - misc
                req_type = 19;
                foreach (String passedProjNumber in projectList)
                {
                    //get the project_id of passedProjNumber
                    var currentProj = db.ProjectInformations.Single(a => a.project_number.Equals(passedProjNumber));

                    //get reqs for this current project and add to a list
                    var reqs = db.OtherReqs.Where(a => a.project_id.Equals(currentProj.project_id));
                    var theseReqs = reqs.ToList();
                    if (theseReqs.Count() > 0)
                    {
                        foreach (OtherReq req in theseReqs)
                        {
                            if (!singleInstanceReqs.Contains(req.misc))
                            {
                                singleInstanceReqs.Add(req.misc);
                                singleInstanceProjs.Add(currentProj.project_id.ToString());
                            }
                            else
                            {
                                if (!multiInstanceReqs.Contains(req.misc))
                                {
                                    multiInstanceReqs.Add(req.misc);
                                    multiInstanceProjs.Add(currentProj.project_id.ToString());
                                }
                                else
                                {
                                    multiInstanceProjs[multiInstanceReqs.IndexOf(req.misc)] += "|" + currentProj.project_id.ToString();
                                }
                            }
                        }
                    }
                }
                createNewEntries(req_type, singleInstanceReqs, singleInstanceProjs, multiInstanceReqs, multiInstanceProjs, db, int.Parse(filter));

            }
            return new PagedData("success! " + comment);
        }



















        public void createNewEntries(int req_type, List<string> singleInstanceReqs, List<string> singleInstanceProjs, List<string> multiInstanceReqs, List<string> multiInstanceProjs, CookDBDataContext db, int filter)
        {
            //loop through lists and move all single instances that are IN multi instances TO multi instances and delete from single.
            //do this a few times to make sure no matches slip through the cracks...
            for (int p = 0; p < 5; p++)
            {
                for (int i = 0; i < singleInstanceReqs.Count(); i++)
                {
                    if (multiInstanceReqs.Contains(singleInstanceReqs[i]))
                    {
                        //if theres a match, concat a pipe and then the accompanying project id of the project that shares the req
                        multiInstanceProjs[multiInstanceReqs.IndexOf(singleInstanceReqs[i])] += "|" + singleInstanceProjs[i];
                        //remove this req from the singles
                        singleInstanceReqs.RemoveAt(i);
                        singleInstanceProjs.RemoveAt(i);
                    }
                }
            }
         

            //create new entry for each of the single instances
            for (int i = 0; i < singleInstanceReqs.Count(); i++)
            {
                BuffetProjectRequirement newEntry = new BuffetProjectRequirement();

                newEntry.name = singleInstanceReqs[i];
                newEntry.filename = singleInstanceReqs[i];
                newEntry.project_id = filter;
                newEntry.associated_projects = db.ProjectInformations.Single(z => z.project_id.Equals(singleInstanceProjs[i])).project_number;
                newEntry.requirement_type_id = req_type;
                if (newEntry.filename != "" && newEntry.filename != null)
                {
                    db.BuffetProjectRequirements.InsertOnSubmit(newEntry);
                    db.SubmitChanges();
                }
            }
            //create new entry for each of the multi instances
            for (int i = 0; i < multiInstanceReqs.Count(); i++)
            {
                BuffetProjectRequirement newEntry = new BuffetProjectRequirement();

                var brokenUpProjects = multiInstanceProjs[i].Split('|');
                foreach (string a in brokenUpProjects)
                {
                    newEntry.associated_projects += db.ProjectInformations.Single(z => z.project_id.Equals(int.Parse(a))).project_number + ",";
                }
                newEntry.associated_projects = newEntry.associated_projects.Substring(0, newEntry.associated_projects.LastIndexOf(','));
                newEntry.project_id = filter;
                newEntry.requirement_type_id = req_type;
                newEntry.name = multiInstanceReqs[i];
                newEntry.filename = multiInstanceReqs[i];
                if (newEntry.filename != "" && newEntry.filename != null)
                {
                    db.BuffetProjectRequirements.InsertOnSubmit(newEntry);
                    db.SubmitChanges();
                }
            }
        }
    }
}
