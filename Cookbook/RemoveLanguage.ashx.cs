using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for RemoveLanguage
    /// </summary>
    public class RemoveLanguage : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call RemoveLanguage.ashx without parameters");

            if (context.Request.Params.Get("language") == null)
                return new PagedData("Language is null");

            Language language = db.Languages.Single(a => a.language1.Equals(context.Request.Params.Get("language")));
            db.Languages.DeleteOnSubmit(language);
            db.SubmitChanges();

            return new PagedData("");
        }
    }
}