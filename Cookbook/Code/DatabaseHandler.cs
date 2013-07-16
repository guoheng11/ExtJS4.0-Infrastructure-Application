using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Security.Principal;
using System.Web.Configuration;
using System.Configuration;

namespace Cookbook {
    public abstract class DatabaseHandler : IHttpHandler {

        public static CookDBDataContext getDataContext(HttpContext context)
        {
            return new CookDBDataContext(getConnectionString(context));
        }

        public static string getConnectionString(HttpContext context)
        {
            string cs = "cookbookConnectionString";
            if (context.Request.Url.AbsolutePath.Contains("CookbookDEV") || !isNull(context.Request.Params.Get("CookbookDEV")))
            {
                cs = "cookbookConnectionString";
            }
            return WebConfigurationManager.ConnectionStrings[cs].ToString();
        }

        /*
        public static User getUser(HttpContext context, CookDBDataContext db)
        {
            return db.Users.SingleOrDefault(a => a.username.Equals(context.Request.ServerVariables["AUTH_USER"]));
        }
        */

        public void ProcessRequest(HttpContext context) {
            bool debug = false;
            if (context.Request.Url.AbsolutePath.Contains("CookbookDEV") || !isNull(context.Request.Params.Get("CookbookDEV"))) {
                debug = false; // change back if you need...
            }
            CookDBDataContext db = getDataContext(context);
            PagedData ret = null;
            context.Response.ContentType = "text/html";

            //User u = getUser(context, db);

            string msg = "Unknown failure";
            try {
                int start = intParse(context.Request.Params.Get("start"));
                int limit = intParse(context.Request.Params.Get("limit"));
                ret = ProcessRequest(context, db, start, limit);
            }
            catch (Exception e) {
                msg = e.Message;
                if (debug) throw new Exception("Error", e);
            }
            if (ret == null)
                ret = new PagedData(msg, false);

            context.Response.Write(JsonConvert.SerializeObject(ret, 
                new JsonConverter[] { new JavaScriptDateTimeConverter() }));
        }

        public string getLocalPath(HttpContext context)
        {
            return context.Server.MapPath("/");
        }

        public static int intParse(string str)
        {
            int ret = 0;
            try
            {
                ret = int.Parse(str);
            }
            catch (Exception) { }
            return ret;
        }

        public abstract PagedData ProcessRequest(HttpContext context, CookDBDataContext db);
        public virtual PagedData ProcessRequest(HttpContext context, CookDBDataContext db, int start, int limit)
        {
            return ProcessRequest(context, db).Page(start, limit);
        }

        /*
        //Helper methods
        public static T FetchObjectById<T>(Table<T> table, HttpContext context, string id_name) where T : class, IGetId<T>, new() {
            return FetchObjectById<T>(table, context, id_name, false);
        }

        public static T FetchObjectById<T>(Table<T> table, HttpContext context, string id_name, bool create) where T : class, IGetId<T>, new() {
            return FetchObjectById<T>(table, context.Request.Params.Get(id_name), create);
        }

        public static T FetchObjectById<T>(Table<T> table, string id) where T : class, IGetId<T>, new() {
            return FetchObjectById<T>(table, id, false);
        }

        public static T FetchObjectById<T>(Table<T> table, string id, bool create) where T : class, IGetId<T>, new() {
            return FetchObjectByIds<T>(table, new string[] { id }, create);
        }

        public static T FetchObjectByIds<T>(Table<T> table, HttpContext context, string[] id_names) where T : class, IGetId<T>, new() {
            return FetchObjectByIds<T>(table, context, id_names, false);
        }

        public static T FetchObjectByIds<T>(Table<T> table, HttpContext context, string[] id_names, bool create) where T : class, IGetId<T>, new() {
            string[] ids = new string[id_names.Length];
            for(int i=0; i<ids.Length; i++) {
                ids[i] = context.Request.Params.Get(id_names[i]);
            }
            return FetchObjectByIds<T>(table, ids, create);
        }

        public static T FetchObjectByIds<T>(Table<T> table, string[] ids, bool create) where T : class, IGetId<T>, new() {
            T t = new T();
            try {
                t = table.SingleOrDefault(t.compareIds(ids));
            }
            catch {
                t = null;
            }
            if (t == null) {
                if (create) {
                    t = new T();
                    table.InsertOnSubmit(t);
                }
                else return null;
            }
            return t;
        }
        */

        public static bool isNull(string str) {
            return (str == null || str.Equals(""));
        }

        public bool IsReusable {
            get { return true; }
        }
    }
}
