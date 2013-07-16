using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetLanguages
    /// </summary>
    public class GetLanguages : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Language> q = db.Languages;

            return new PagedData(q.Select(a => new { a.language_id, a.language1 }));
        }
    }
}