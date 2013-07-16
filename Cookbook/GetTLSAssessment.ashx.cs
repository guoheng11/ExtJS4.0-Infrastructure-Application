using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    public class GetTLSAssessment : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<SWDAssessment> q = db.SWDAssessments;

            string username = context.Request.Params.Get("user_name");
            string filter = context.Request.Params.Get("project_id");

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string readOnly = context.Request.Params.Get("read_only");

            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }
            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        if (!isNull(filter))
                        {
                            List<String> assessmentTypeList = new List<string>();
                            assessmentTypeList.Add("Design/Documentation");
                            assessmentTypeList.Add("Coding");

                            q = q.Where(a => a.project_id == int.Parse(filter) && (
                                a.AssessmentType.type == "AccessUSAN SetUp TLS_IP" ||
                                a.AssessmentType.type == "Production Implementation TLS_IP" ||
                                a.AssessmentType.type == "UAT Support TLS_IP" ||
                                a.AssessmentType.type == "UAT Implementation TLS_IP" ||
                                a.AssessmentType.type == "Other TLS_IP"
                                ));
                            return new PagedData(q.Select(a => new
                            {
                                a.project_id,
                                a.Contact.name,
                                a.AssessmentType.type,
                                a.hours,
                                a.action,
                                a.requested_start_date,
                                a.requested_complete,
                                a.scheduled_start_date,
                                a.scheduled_complete,
                                a.actual_complete,
                                a.booked_hours,
                                a.swd_assessment_id
                            }));
                        }
                        else
                        {
                            return new PagedData("GetSWDAssessment expects a project_id");
                        }
                    }
                default:
                    return new PagedData("Error: Unsupported Http Request:  " + context.Request.RequestType + " not recognized", false);
            }
        }
    }
}