using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetFileXferDownloads
    /// </summary>
    public class GetFileXferDownloads : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<FileXferDownload> q = db.FileXferDownloads;

            return new PagedData(q.Select(a => new { a.filexfer_download_id, a.name }));
        }
    }
}