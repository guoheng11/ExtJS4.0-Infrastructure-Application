using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddScraper
    /// </summary>
    public class AddScraper : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string idPassed = "";
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddScraper.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");
            if (context.Request.Params.Get("edit") != "true")
            {
                Scraper scraper = new Scraper();
                scraper.name = context.Request.Params.Get("name");
                if (context.Request.Params.Get("type") != null)
                {
                    if (db.ScraperTypes.Count(a => a.type.Equals(context.Request.Params.Get("type"))) == 1)
                    {
                        scraper.ScraperType = db.ScraperTypes.Single(a => a.type.Equals(context.Request.Params.Get("type")));
                    }
                    else
                    {
                        scraper.ScraperType = null;
                    }
                }
                else
                {
                    scraper.ScraperType = null;
                }
                
                db.Scrapers.InsertOnSubmit(scraper);
                db.SubmitChanges();

                return new PagedData("scraper added");
            }
            else
            {
                if (context.Request.Params.Get("id") != null && context.Request.Params.Get("id") != "")
                    idPassed = context.Request.Params.Get("id");
                else
                    return new PagedData("ID is null", false);

                if (db.Scrapers.Count(a => a.scraper_id.Equals(idPassed)) == 1)
                {
                    Scraper existingScraper = db.Scrapers.Single(a => a.scraper_id.Equals(idPassed));
                    existingScraper.name = context.Request.Params.Get("name");
                    if (context.Request.Params.Get("type") != null)
                    {
                        if (db.ScraperTypes.Count(a => a.type.Equals(context.Request.Params.Get("type"))) == 1)
                        {
                            existingScraper.ScraperType = db.ScraperTypes.Single(a => a.type.Equals(context.Request.Params.Get("type")));
                        }
                        else
                        {
                            existingScraper.ScraperType = null;
                        }
                    }
                    else
                    {
                        existingScraper.ScraperType = null;
                    }

                    db.SubmitChanges();
                    return new PagedData("scraper edited");
                }
                else
                {
                    return new PagedData("Error: scraper ID passed either does not exist or has multiple matches (" + db.Scrapers.Count(a => a.scraper_id.Equals(idPassed)) + ")...Contact Cookbook Admin", false);
                }
            }
        }
    }
}