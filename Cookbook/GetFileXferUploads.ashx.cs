using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetFileXferUploads
    /// </summary>
    public class GetFileXferUploads : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<FileXferUpload> q = db.FileXferUploads;

            return new PagedData(q.Select(a => new { a.filexfer_upload_id, a.name }));
        }
    }
}