using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetGrammars
    /// </summary>
    public class GetGrammars : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<Grammar> q = db.Grammars;

            return new PagedData(q.Select(a => new { a.grammar_id, a.name, a.filename }));
        }
    }
}