using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetConfigurationFiles
    /// </summary>
    public class GetConfigurationFiles : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ConfigurationFile> q = db.ConfigurationFiles;

            return new PagedData(q.Select(a => new { a.configuration_file_id, a.name }));
        }
    }
}