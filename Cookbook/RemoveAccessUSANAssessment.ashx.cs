using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    public class RemoveAccessUSANAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string assessment_id = context.Request.Params.Get("assessment_id");
                if (!isNull(assessment_id))
                {
                    AccessUSANReq record = db.AccessUSANReqs.Single(a => a.accessusan_req_id.Equals(assessment_id));
                    db.AccessUSANReqs.DeleteOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData("AccessUSANAssessment deleted");
                }

                return new PagedData("RemoveAccessUSANAssessment.ashx requires an assessment_id");
            }

            return new PagedData("RemoveAccessUSANAssessment.ashx requires a project_id");
        }
    }
}