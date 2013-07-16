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
    /// Summary description for GetBuffetProdInstallRequirements
    /// </summary>
    public class GetBuffetProdInstallRequirements : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<BuffetProjectRequirement> q = db.BuffetProjectRequirements;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
            }
            else
            {
                return new PagedData("GetBuffetProdInstallRequirements expects a project_id");
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


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        return new PagedData(q.Select(a => new { a.buffet_project_req_id, a.associated_projects, a.ProjectInformation.project_number, a.notes, a.name, a.filename, a.RequirementType.type, }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            BuffetProjectRequirement record = new BuffetProjectRequirement();

                            record.project_id = int.Parse(filter);
                            if ((string)obj["name"] != null)
                            {
                                record.name = (string)obj["name"];
                            }
                            if ((string)obj["filename"] != null)
                            {
                                record.filename = (string)obj["filename"];
                            }
                            if ((string)obj["associated_projects"] != null)
                            {
                                record.associated_projects = (string)obj["associated_projects"];
                            }
                            if ((string)obj["type"] != null && (string)obj["type"] != "")
                            {
                                record.requirement_type_id = (db.RequirementTypes.Single(a => a.type.Equals((string)obj["type"]))).requirement_type_id;
                            }
                            if ((string)obj["notes"] != null)
                            {
                                record.notes = (string)obj["notes"];
                            }
                            
                            db.BuffetProjectRequirements.InsertOnSubmit(record);
                            db.SubmitChanges();

                            return new PagedData(new { record.buffet_project_req_id, record.project_id, record.associated_projects, record.name, record.filename, record.notes, record.RequirementType.type });
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<Object> list = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            BuffetProjectRequirement record = new BuffetProjectRequirement();
                            record.project_id = int.Parse(filter);
                            if ((string)objs[j]["name"] != null)
                            {
                                record.name = (string)objs[j]["name"];
                            }
                            if ((string)objs[j]["filename"] != null)
                            {
                                record.filename = (string)objs[j]["filename"];
                            }
                            if ((string)objs[j]["associated_projects"] != null)
                            {
                                record.associated_projects = (string)objs[j]["associated_projects"];
                            }
                            if ((string)objs[j]["type"] != null && (string)objs[j]["type"] != "")
                            {
                                record.requirement_type_id = (db.RequirementTypes.Single(a => a.type.Equals((string)objs[j]["type"]))).requirement_type_id;
                            }
                            if ((string)objs[j]["notes"] != null)
                            {
                                record.notes = (string)objs[j]["notes"];
                            }

                            db.BuffetProjectRequirements.InsertOnSubmit(record);
                            db.SubmitChanges();
                            list.Add(new { record.buffet_project_req_id, record.project_id, record.associated_projects, record.name, record.filename, record.notes, record.RequirementType.type });
                        }


                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            BuffetProjectRequirement record = db.BuffetProjectRequirements.Single(a => a.buffet_project_req_id.Equals((int)obj["buffet_project_req_id"]));
                            //record.project_id = int.Parse(filter);
                           /* if ((string)obj["name"] != null)
                            {
                                record.name = (string)obj["name"];
                            }
                            if ((string)obj["filename"] != null)
                            {
                                record.filename = (string)obj["filename"];
                            }
                            if ((string)obj["associated_projects"] != null)
                            {
                                record.associated_projects = (string)obj["associated_projects"];
                            }
                            if ((string)obj["type"] != null && (string)obj["type"] != "")
                            {
                                record.requirement_type_id = (db.RequirementTypes.Single(a => a.type.Equals((string)obj["type"]))).requirement_type_id;
                            }*/
                            if ((string)obj["notes"] != null)
                            {
                                record.notes = (string)obj["notes"];
                            }

                            db.SubmitChanges();
                            return new PagedData(new { record.buffet_project_req_id, record.project_id, record.associated_projects, record.name, record.filename, record.notes, record.RequirementType.type });
                        }


                        JArray objs = (JArray)blob["rows"];
                        List<Object> returnList = new List<Object>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            BuffetProjectRequirement record = db.BuffetProjectRequirements.Single(a => a.buffet_project_req_id.Equals((int)objs[j]["buffet_project_req_id"]));
                            //record.project_id = int.Parse(filter);
                           /* if ((string)objs[j]["name"] != null)
                            {
                                record.name = (string)objs[j]["name"];
                            }
                            if ((string)objs[j]["filename"] != null)
                            {
                                record.filename = (string)objs[j]["filename"];
                            }
                            if ((string)objs[j]["associated_projects"] != null)
                            {
                                record.associated_projects = (string)objs[j]["associated_projects"];
                            }
                            if ((string)objs[j]["type"] != null && (string)objs[j]["type"] != "")
                            {
                                record.requirement_type_id = (db.RequirementTypes.Single(a => a.type.Equals((string)objs[j]["type"]))).requirement_type_id;
                            }*/
                            if ((string)objs[j]["notes"] != null)
                            {
                                record.notes = (string)objs[j]["notes"];
                            }

                            db.SubmitChanges();
                            returnList.Add(new {record.buffet_project_req_id, record.project_id, record.associated_projects, record.name, record.filename, record.notes, record.RequirementType.type});
                        }

                        return new PagedData(returnList);
                    }
                case "DELETE":
                    {

                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];


                            BuffetProjectRequirement record = db.BuffetProjectRequirements.Single(a => a.buffet_project_req_id.Equals((int)obj["buffet_project_req_id"]));
                            db.BuffetProjectRequirements.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            return new PagedData("good");
                        }

                        JArray objs = (JArray)blob["rows"];

                        for (int j = 0; j < objs.Count; j++)
                        {
                            BuffetProjectRequirement record = db.BuffetProjectRequirements.Single(a => a.buffet_project_req_id.Equals((int)objs[j]["buffet_project_req_id"]));
                            db.BuffetProjectRequirements.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("BuffetProjectRequirements deleted");
                    }

                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }
        }
    }
}