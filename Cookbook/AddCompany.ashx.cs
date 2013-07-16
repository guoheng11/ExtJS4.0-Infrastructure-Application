using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddCompany
    /// </summary>
    public class AddCompany : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddCompany.ashx without parameters");

            if (context.Request.Params.Get("company_name") == null)
                return new PagedData("Company is null");

            Company company = new Company();

            company.company_name = context.Request.Params.Get("company_name");
            db.Companies.InsertOnSubmit(company);

            db.SubmitChanges();

            return new PagedData("");
        }
    }
}