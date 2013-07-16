using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddBusinessUnit
    /// </summary>
    public class AddBusinessUnit : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddBusinessUnit.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");
            if (context.Request.Params.Get("company_name") == null)
                return new PagedData("Company is null");

            BusinessUnit bu = new BusinessUnit();
            Company company = db.Companies.Single(a => a.company_name.Equals(context.Request.Params.Get("company_name")));

            bu.name = context.Request.Params.Get("name");
            bu.Company = company;
            db.BusinessUnits.InsertOnSubmit(bu);

            db.SubmitChanges();

            return new PagedData("");
        }
    }
}