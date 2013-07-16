using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    public class AddAccessUSANAssessment : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string project_id = context.Request.Params.Get("project_id");
            if (!isNull(project_id))
            {
                AccessUSANReq record = new AccessUSANReq();
                record.project_id = int.Parse(project_id);
                db.AccessUSANReqs.InsertOnSubmit(record);
                db.SubmitChanges();
                return new PagedData(new { record.accessusan_req_id });
            }
            return new PagedData("AddAccessUSANAssessment.ashx requires a project_id");
        }
    }
}