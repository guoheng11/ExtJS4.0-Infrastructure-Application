using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveSWDAssessment
    /// </summary>
    public class RemoveSWDAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string assessment_id = context.Request.Params.Get("assessment_id");
                if (!isNull(assessment_id))
                {
                    SWDAssessment record = db.SWDAssessments.Single(a => a.swd_assessment_id.Equals(assessment_id));
                    db.SWDAssessments.DeleteOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData("SWDAssessment deleted");
                }

                return new PagedData("RemoveSWDAssessment.ashx requires an assessment_id");
            }

            return new PagedData("RemoveSWDAssessment.ashx requires a project_id");
        }
    }
}