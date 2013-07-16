using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddGrammar
    /// </summary>
    public class AddGrammar : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddGrammar.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");
            


            Grammar gram = new Grammar();

            gram.name = context.Request.Params.Get("name");
            gram.filename = "n/a";

            /*if (context.Request.Params.Get("filename") != null)
                gram.name = context.Request.Params.Get("filename");*/

            db.Grammars.InsertOnSubmit(gram);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}