using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetScrapers
    /// </summary>
    public class GetScrapers : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Scraper> q = db.Scrapers;

            return new PagedData(q.Select(a => new { a.scraper_id, a.name, a.ScraperType.type }));
        }
    }
}