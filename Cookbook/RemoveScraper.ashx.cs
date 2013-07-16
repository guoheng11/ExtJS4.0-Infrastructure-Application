using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveScraper
    /// </summary>
    public class RemoveScraper : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveScraper.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            Scraper scraper = db.Scrapers.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.Scrapers.DeleteOnSubmit(scraper);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}