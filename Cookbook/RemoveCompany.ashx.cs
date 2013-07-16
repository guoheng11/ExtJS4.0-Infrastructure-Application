using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveCompany
    /// </summary>
    public class RemoveCompany : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveCompany.ashx without parameters");

            if (context.Request.Params.Get("company_name") == null)
                return new PagedData("Company is null");

            Company company = db.Companies.Single(a => a.company_name.Equals(context.Request.Params.Get("company_name")));
            db.Companies.DeleteOnSubmit(company);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}