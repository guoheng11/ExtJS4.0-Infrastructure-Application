using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveGrammar
    /// </summary>
    public class RemoveGrammar : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveGrammar.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            Grammar gram = db.Grammars.Single(a => a.name.Equals(context.Request.Params.Get("name")));
            db.Grammars.DeleteOnSubmit(gram);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}