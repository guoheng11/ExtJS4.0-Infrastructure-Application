using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddConfigurationFile
    /// </summary>
    public class AddConfigurationFile : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddConfigurationFile.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");

            ConfigurationFile cf = new ConfigurationFile();
            cf.name = context.Request.Params.Get("name");
            db.ConfigurationFiles.InsertOnSubmit(cf);


            db.SubmitChanges();

            return new PagedData("");
        }
    }
}