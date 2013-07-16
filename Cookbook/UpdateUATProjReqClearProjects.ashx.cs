using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;


//this handler actually clears AND then repopulates the ProjectRequirements for the given project. this was originally done JS side but adam didn't like 15 sec POSTs...

namespace Cookbook
{
    public class UpdateUATProjReqClearProjects : DatabaseHandler
    {
        String comment = "comments:";
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            //JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            String incomingProjectName = (string)(reader.ReadToEnd());

            string filter = context.Request.Params.Get("project_id");
            string install_type = context.Request.Params.Get("install_type");
            if (!isNull(filter))
            {
                if (isNull(install_type))
                {
                    return new PagedData("no install type submitted");
                }
                else
                {
                    switch (install_type)
                    {
                        case ("uat"):
                            {
                                if (db.ProjectRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type.ToLower().Equals("uat")) > 0)
                                {
                                    var wiping = db.ProjectRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.ToLower().Equals("uat"));
                                    db.ProjectRequirements.DeleteAllOnSubmit(wiping);
                                    db.SubmitChanges();
                                    comment += "[Project ID: " + int.Parse(filter) + " type:" + install_type + " cleared]";
                                }
                                break;
                            }
                        case ("prod"):
                            {
                                if (db.ProjectRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type.ToLower().Equals("prod")) > 0)
                                {
                                    var wiping = db.ProjectRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.ToLower().Equals("prod"));
                                    db.ProjectRequirements.DeleteAllOnSubmit(wiping);
                                    db.SubmitChanges();
                                    comment += "[Project ID: " + int.Parse(filter) + " type:" + install_type + " cleared]";
                                }
                                break;
                            }
                        case ("soak"):
                            {
                                if (db.ProjectRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type.ToLower().Equals("soak")) > 0)
                                {
                                    var wiping = db.ProjectRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.ToLower().Equals("soak"));
                                    db.ProjectRequirements.DeleteAllOnSubmit(wiping);
                                    db.SubmitChanges();
                                    comment += "[Project ID: " + int.Parse(filter) + " type:" + install_type + " cleared]";
                                }
                                break;
                            }
                        default:
                            return new PagedData("no valid install type submitted");
                    }
                }

                try
                {
                    //application
                    if (db.ApplicationReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.ApplicationReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].app_file != null && allTheReqs[i].app_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].app_file;
                                newReq.name = allTheReqs[i].app_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Application"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].rpt_file != null && allTheReqs[i].rpt_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].rpt_file;
                                newReq.name = allTheReqs[i].rpt_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Application"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].prm_file != null && allTheReqs[i].prm_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].prm_file;
                                newReq.name = allTheReqs[i].prm_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Application"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].prm_instructions != null && allTheReqs[i].prm_instructions != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].prm_instructions;
                                newReq.name = allTheReqs[i].prm_instructions;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Application"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }

                    //table
                    if (db.TableReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.TableReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].xls_csv_file != null && allTheReqs[i].xls_csv_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].xls_csv_file;
                                newReq.name = allTheReqs[i].xls_csv_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Table"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].def_file != null && allTheReqs[i].def_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].def_file;
                                newReq.name = allTheReqs[i].def_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Table"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].etm_file != null && allTheReqs[i].etm_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].etm_file;
                                newReq.name = allTheReqs[i].etm_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Table"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }

                    //routing
                    if (db.RequirementsTabRoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.RequirementsTabRoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].description != null && allTheReqs[i].description != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].description;
                                newReq.name = allTheReqs[i].description;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Routing"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }

                    //scraper
                    if (db.ScraperReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.ScraperReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].exe_file != null && allTheReqs[i].exe_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].exe_file;
                                newReq.name = allTheReqs[i].exe_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Scraper"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].pdb_file != null && allTheReqs[i].pdb_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].pdb_file;
                                newReq.name = allTheReqs[i].pdb_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Scraper"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //engine
                    if (db.EngineReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.EngineReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].exe_file != null && allTheReqs[i].exe_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].exe_file;
                                newReq.name = allTheReqs[i].exe_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Engine"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].pdb_file != null && allTheReqs[i].pdb_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].pdb_file;
                                newReq.name = allTheReqs[i].pdb_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Engine"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //manager
                    if (db.ManagerReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.ManagerReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].exe_file != null && allTheReqs[i].exe_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].exe_file;
                                newReq.name = allTheReqs[i].exe_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Manager"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].pdb_file != null && allTheReqs[i].pdb_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].pdb_file;
                                newReq.name = allTheReqs[i].pdb_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Manager"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //grammar
                    if (db.GrammarReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.GrammarReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].filename != null && allTheReqs[i].filename != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].filename;
                                newReq.name = allTheReqs[i].filename;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Grammar"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //vxml
                    if (db.VXMLReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.VXMLReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].description != null && allTheReqs[i].description != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].description;
                                newReq.name = allTheReqs[i].description;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("VXML"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //backoffice DB
                    if (db.BackofficeDBReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.BackofficeDBReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].sql_file != null && allTheReqs[i].sql_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].sql_file;
                                newReq.name = allTheReqs[i].sql_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Backoffice DB"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //backoffice process
                    if (db.BackofficeProcessReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.BackofficeProcessReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].exe_file != null && allTheReqs[i].exe_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].exe_file;
                                newReq.name = allTheReqs[i].exe_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Backoffice Process"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //backoffice webservice
                    if (db.BackofficeWebserviceReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.BackofficeWebserviceReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].war_file != null && allTheReqs[i].war_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].war_file;
                                newReq.name = allTheReqs[i].war_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Backoffice Webservice"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].tar_file != null && allTheReqs[i].tar_file != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].tar_file;
                                newReq.name = allTheReqs[i].tar_file;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Backoffice Webservice"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //configuration file
                    if (db.ConfigFileReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.ConfigFileReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].filename != null && allTheReqs[i].filename != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].filename;
                                newReq.name = allTheReqs[i].filename;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Configuration File"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].instructions != null && allTheReqs[i].instructions != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].instructions;
                                newReq.name = allTheReqs[i].instructions;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Configuration File"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //fax form
                    if (db.FaxFormReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.FaxFormReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].filename != null && allTheReqs[i].filename != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].filename;
                                newReq.name = allTheReqs[i].filename;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Fax Form"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].instructions != null && allTheReqs[i].instructions != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].instructions;
                                newReq.name = allTheReqs[i].instructions;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Fax Form"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //file xfer upload/download
                    if (db.FileXferReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.FileXferReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].name != null && allTheReqs[i].name != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].name;
                                newReq.name = allTheReqs[i].name;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("File Xfer"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //tts functionality
                    if (db.TTSFunctionalityReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.TTSFunctionalityReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].call_volume != null && allTheReqs[i].call_volume != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].call_volume;
                                newReq.name = allTheReqs[i].call_volume;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("TTS Functionality"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //tnt functionality
                    if (db.TNTFunctionalityReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.TNTFunctionalityReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].call_volume != null && allTheReqs[i].call_volume != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].call_volume;
                                newReq.name = allTheReqs[i].call_volume;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("TNT Functionality"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //speech recognition
                    if (db.SpeechRecognitionReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.SpeechRecognitionReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].call_volume != null && allTheReqs[i].call_volume != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].call_volume;
                                newReq.name = allTheReqs[i].call_volume;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Speech Recognition"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //uui
                    if (db.UUIReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.UUIReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].call_volume != null && allTheReqs[i].call_volume != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].call_volume;
                                newReq.name = allTheReqs[i].call_volume;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("UUI"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //service id
                    if (db.ServiceIDReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.ServiceIDReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].product != null && allTheReqs[i].product != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].product;
                                newReq.name = allTheReqs[i].product;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Service ID"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                            if (allTheReqs[i].service_id != null && allTheReqs[i].service_id != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].service_id;
                                newReq.name = allTheReqs[i].service_id;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Service ID"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                    //other
                    if (db.OtherReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var allTheReqs = db.OtherReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < allTheReqs.Count(); i++)
                        {
                            if (allTheReqs[i].misc != null && allTheReqs[i].misc != "")
                            {
                                ProjectRequirement newReq = new ProjectRequirement();
                                newReq.type = install_type;
                                newReq.project_id = int.Parse(filter);
                                newReq.filename = allTheReqs[i].misc;
                                newReq.name = allTheReqs[i].misc;
                                newReq.RequirementType = db.RequirementTypes.Single(a => a.type.Equals("Other"));
                                db.ProjectRequirements.InsertOnSubmit(newReq);
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    return new PagedData("Error: please show cookbook admin this screen: " + e.Message + "|" + e.Source + "|" + e.StackTrace + "|" + e.InnerException);
                }

                db.SubmitChanges();

                return new PagedData("success! " + comment);
            }
            return new PagedData("no proj id submitted");
        }
    }
}