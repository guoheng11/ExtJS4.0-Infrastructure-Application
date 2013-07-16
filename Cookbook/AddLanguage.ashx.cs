using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddLanguage
    /// </summary>
    public class AddLanguage : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddLanguage.ashx without parameters");

            if (context.Request.Params.Get("language") == null)
                return new PagedData("Language is null");


            Language language = new Language();

            language.language1 = context.Request.Params.Get("language");
            db.Languages.InsertOnSubmit(language);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}