using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for AddExtdbTable
    /// </summary>
    public class AddExtdbTable : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string idPassed = "";
            if (context.Request.Params.Count == 0)
                return new PagedData("Can't call AddExtdbTable.ashx without parameters");

            if (context.Request.Params.Get("name") == null)
                return new PagedData("Name is null");
            if (context.Request.Params.Get("type") == null)
                return new PagedData("Type is null");
            if (context.Request.Params.Get("edit") != "true")
            {
                ExtdbTable table = new ExtdbTable();
                table.name = context.Request.Params.Get("name");
                table.type = context.Request.Params.Get("type");
                db.ExtdbTables.InsertOnSubmit(table);

                db.SubmitChanges();
                return new PagedData("table added");
            }
            else
            {
                if (context.Request.Params.Get("id") != null && context.Request.Params.Get("id") != "")
                    idPassed = context.Request.Params.Get("id");
                else
                    return new PagedData("ID is null");

                if (db.ExtdbTables.Count(a => a.extdb_table_id.Equals(idPassed)) == 1)
                {
                    ExtdbTable existingTable = db.ExtdbTables.Single(a => a.extdb_table_id.Equals(idPassed));
                    existingTable.name = context.Request.Params.Get("name");
                    existingTable.type = context.Request.Params.Get("type");

                    db.SubmitChanges();
                    return new PagedData("table edited");
                }
                else
                {
                    return new PagedData("Error: table ID passed either does not exist or has multiple matches (" + db.ExtdbTables.Count(a => a.extdb_table_id.Equals(idPassed)) + ")...Contact Cookbook Admin");
                }
            }
        }
    }
}