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
    /// Summary description for GetProjectRequirements
    /// </summary>
    public class GetProjectRequirements : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectRequirement> q = db.ProjectRequirements;

            string filter = context.Request.Params.Get("project_id");
            string install_type = context.Request.Params.Get("install_type");



            string readOnly = context.Request.Params.Get("read_only");
            if (isNull(readOnly))
            {
                return new PagedData("read_only flag is expected");
            }
            if (isNull(install_type))
            {
                return new PagedData("install type is expected");
            }
            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter) && a.type.ToLower().Equals(install_type));
            }
            else
            {
                return new PagedData("ProjectRequirements.ashx expects a project ID");
            }

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.project_requirements_id, a.project_id, a.name, a.filename, a.notes, a.additional_notes, a.RequirementType.type }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectRequirement record = new ProjectRequirement();
                            record.project_id = int.Parse(filter);
                            record.type = install_type.ToLower();
                            if ((string)obj["name"] != null)
                            {
                                record.name = (string)obj["name"];
                            }
                            if ((string)obj["filename"] != null)
                            {
                                record.filename = (string)obj["filename"];
                            }
                            if ((string)obj["additional_notes"] != null)
                            {
                                record.additional_notes = (string)obj["additional_notes"];
                            }
                            if ((string)obj["notes"] != null)
                            {
                                record.notes = (string)obj["notes"];
                            }
                            
                            
                            db.ProjectRequirements.InsertOnSubmit(record);
                            db.SubmitChanges();

                            if ((string)obj["type"] != null && (string)obj["type"] != "")
                            {
                                return new PagedData(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, record.RequirementType.type, record.notes });
                            }
                            else
                            {
                                String type = "";
                                return new PagedData(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, type, record.notes });
                            }
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> returnList = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectRequirement record = new ProjectRequirement();
                            record.project_id = int.Parse(filter);
                            record.type = install_type.ToLower();
                            if ((string)objs[j]["name"] != null)
                            {
                                record.name = (string)objs[j]["name"];
                            }
                            if ((string)objs[j]["filename"] != null)
                            {
                                record.filename = (string)objs[j]["filename"];
                            }
                            if ((string)objs[j]["additional_notes"] != null)
                            {
                                record.additional_notes = (string)objs[j]["additional_notes"];
                            }
                            if ((string)objs[j]["notes"] != null)
                            {
                                record.notes = (string)objs[j]["notes"];
                            }

                            db.ProjectRequirements.InsertOnSubmit(record);
                            db.SubmitChanges();


                            if ((string)objs[j]["type"] != null && (string)objs[j]["type"] != "")
                            {
                                returnList.Add(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, record.RequirementType.type, record.notes });
                            }
                            else
                            {
                                String type = "";
                                returnList.Add(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, type, record.notes });
                            }

                        }


                        return new PagedData(returnList);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            ProjectRequirement record = db.ProjectRequirements.Single(a => a.project_requirements_id.Equals((int)obj["project_requirements_id"]));
                            //record.project_id = int.Parse(filter);

                            if ((string)obj["name"] != null)
                            {
                                record.name = (string)obj["name"];
                            }
                            if ((string)obj["filename"] != null)
                            {
                                record.filename = (string)obj["filename"];
                            }
                            if ((string)obj["additional_notes"] != null)
                            {
                                record.additional_notes = (string)obj["additional_notes"];
                            }
                            if ((string)obj["type"] != null && (string)obj["type"] != "")
                            {
                                record.requirement_type_id = (db.RequirementTypes.Single(a => a.type.Equals((string)obj["type"]))).requirement_type_id;
                            }
                            if ((string)obj["notes"] != null)
                            {
                                record.notes = (string)obj["notes"];
                            }

                            db.SubmitChanges();

                            if ((string)obj["type"] != null && (string)obj["type"] != "")
                            {
                                return new PagedData(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, record.RequirementType.type, record.notes });
                            }
                            else
                            {
                                String type = "";
                                return new PagedData(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, type, record.notes });
                            }
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> returnList = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectRequirement record = db.ProjectRequirements.Single(a => a.project_requirements_id.Equals((int)objs[j]["project_requirements_id"]));
                           //record.project_id = int.Parse(filter);

                            if ((string)objs[j]["name"] != null)
                            {
                                record.name = (string)objs[j]["name"];
                            }
                            if ((string)objs[j]["filename"] != null)
                            {
                                record.filename = (string)objs[j]["filename"];
                            }
                            if ((string)objs[j]["additional_notes"] != null)
                            {
                                record.additional_notes = (string)objs[j]["additional_notes"];
                            }
                            if ((string)objs[j]["type"] != null && (string)objs[j]["type"] != "")
                            {
                                record.requirement_type_id = (db.RequirementTypes.Single(a => a.type.Equals((string)objs[j]["type"]))).requirement_type_id;
                            }
                            if ((string)objs[j]["notes"] != null)
                            {
                                record.notes = (string)objs[j]["notes"];
                            }

                            db.SubmitChanges();

                            if ((string)objs[j]["type"] != null && (string)objs[j]["type"] != "")
                            {
                                returnList.Add(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, record.RequirementType.type, record.notes });
                            }
                            else
                            {
                                String type = "";
                                returnList.Add(new { record.project_requirements_id, record.project_id, record.name, record.filename, record.additional_notes, type, record.notes });
                            }

                        }

                        return new PagedData(returnList);
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            

                            ProjectRequirement record = db.ProjectRequirements.Single(a => a.project_requirements_id.Equals((int)obj["project_requirements_id"]));
                            db.ProjectRequirements.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];
                        
                        for (int j = 0; j < objs.Count; j++)
                        {
                            ProjectRequirement record = db.ProjectRequirements.Single(a => a.project_requirements_id.Equals((int)objs[j]["project_requirements_id"]));
                            db.ProjectRequirements.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("ProjectRequirements deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}