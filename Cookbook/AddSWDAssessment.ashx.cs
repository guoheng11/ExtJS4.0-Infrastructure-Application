using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddSWDAssessment
    /// </summary>
    public class AddSWDAssessment : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                string type = context.Request.Params.Get("type");
                if (!isNull(type))
                {
                    SWDAssessment record = new SWDAssessment();
                    record.project_id = int.Parse(project_id);
                    record.assessment_type_id = db.AssessmentTypes.Single(a => a.type.Equals(type)).assessment_type_id;
                    record.contact_id = db.Contacts.Single(a => a.name.Equals("Test Guy")).contact_id;
                    db.SWDAssessments.InsertOnSubmit(record);
                    db.SubmitChanges();

                    return new PagedData(new { record.swd_assessment_id, record.Contact.name });
                }

                return new PagedData("AddSWDAssessment.ashx requires a type");
            }

            return new PagedData("AddSWDAssessment.ashx requires a project_id");
        }
    }
}