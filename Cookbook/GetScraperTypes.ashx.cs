using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetScraperTypes
    /// </summary>
    public class GetScraperTypes : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ScraperType> q = db.ScraperTypes;
            return new PagedData(q.Select(a => new { a.scraper_type_id, a.type }));
        }
    }
}