using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetBusinessUnits
    /// </summary>
    public class GetBusinessUnits : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<BusinessUnit> q = db.BusinessUnits;

            return new PagedData(q.Select(a => new { a.name, a.business_units_id, a.Company.company_name }));

            /*  (smm - Commenting out since we only want all applications)
            
            string cid = context.Request.Params.Get("business_units_id");  //("biz_id");  //("company_id");
            if (!isNull(cid))
            {
                q = q.Where(a => a.company_id == int.Parse(cid));
            }
            else
            {
                //smm (we don't want to do this anymore) return new PagedData("Required parameter company_id missing", false);

                //smm We want to grab all business units if a company_id wasn't supplied!
                string filter = context.Request.Params.Get("name");  //("biz_name");
                if (!isNull(filter))
                {
                    q = q.Where(a => a.name.IndexOf(filter) != -1);
                }

                return new PagedData(q.Select(a => new { a.name, a.business_units_id }));
            }

            IQueryable retq = (from a in q
                               select new
                               {
                                   a.business_units_id,
                                   a.name,
                                   a.Company.company_name,
                               });

            return new PagedData(retq);
            */
        }
    }
}


