using System;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Data.Linq;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Specialized;

namespace Cookbook {
    public abstract class UpdateObject : DatabaseHandler {

        protected enum EntryType {
            STRING,
            INTEGER,
            DATE,
            BOOLEAN,
            FLOAT,
        }

        protected class UpdateEntry {

            private bool _keep_copy;
            public bool keep {
                get { return _keep_copy; }
            }

            private string _request_name;
            public string request_name {
                get { return _request_name; }
                set { _request_name = value; }
            }

            private string _field_name;
            public string field_name {
                get { return _field_name; }
                set { _field_name = value; }
            }

            private EntryType _type;
            public EntryType type {
                get { return _type; }
                set { _type = value; }
            }

            public UpdateEntry(string req, string typ, EntryType et, bool keep) {
                this.request_name = req;
                this.field_name = typ;
                this.type = et;
                _keep_copy = keep;
            }
        }

        private List<UpdateEntry> _dataMap = new List<UpdateEntry>();

        protected IEnumerable<UpdateEntry> dataMap {
            get { return _dataMap.AsEnumerable(); }
        }

        protected void addUpdateEntry(string name) {
            addUpdateEntry(name, name);
        }

        protected void addUpdateEntry(string name, bool keep) {
            addUpdateEntry(name, name, keep);
        }

        protected void addUpdateEntry(string name, EntryType et) {
            addUpdateEntry(name, name, et);
        }

        protected void addUpdateEntry(string req, string type) {
            addUpdateEntry(req, type, EntryType.STRING, true);
        }

        protected void addUpdateEntry(string req, string type, bool keep) {
            addUpdateEntry(req, type, EntryType.STRING, keep);
        }

        protected void addUpdateEntry(string req, string type, EntryType et) {
            addUpdateEntry(req, type, et, true);
        }

        protected void addUpdateEntry(string req, string type, EntryType et, bool keep) {
            UpdateEntry ue = new UpdateEntry(req, type, et, keep);
            _dataMap.Add(ue);
        }

        private object convertObject(object value, UpdateEntry ue) {
            switch (ue.type) {
                case EntryType.STRING:
                    break;
                case EntryType.INTEGER:
                    value = int.Parse((string)value);
                    break;
                case EntryType.DATE:
                    value = DateTime.Parse((string)value);
                    break;
                case EntryType.BOOLEAN:
                    value = bool.Parse((string)value);
                    break;
                case EntryType.FLOAT:
                    value = float.Parse((string)value);
                    break;
                default:
                    throw new Exception("Invalid entry type");
            }
            return value;
        }

        protected string ProcessUpdateRequest(HttpContext context, object update) {
            return ProcessUpdateRequest(context.Request.Params, update);
        }

        /// <summary>
        /// Update an object with the given context's request data based on the current data mapping.
        /// </summary>
        /// <param name="context">The HTTP context to use.</param>
        /// <param name="update">The object to update.</param>
        /// <returns>Message about the fields updated.</returns>
        protected string ProcessUpdateRequest(NameValueCollection map, object update)
        {
            string msg = "";
            foreach(UpdateEntry ue in _dataMap.AsEnumerable<UpdateEntry>()) {
                object value = map.Get(ue.request_name);
                if (!isNull((string)value)) {
                    value = convertObject(value, ue);
                    object u2 = update;
                    string[] fields = ue.field_name.Split(new char[] { '.' });
                    int i;
                    //walk the chain....
                    Type t = update.GetType();
                    for (i = 0; i < fields.Length - 1; i++) {
                        u2 = t.GetProperty(fields[i]).GetGetMethod().Invoke(u2, null);
                        t = u2.GetType();
                    }
                    PropertyInfo pi = t.GetProperty(fields[i]);
                    object old = pi.GetGetMethod().Invoke(u2, null);
                    if (!value.Equals(old)) {
                        pi.GetSetMethod().Invoke(u2, new object[] { value });
                        msg += ue.field_name;
                        if (ue.keep)
                            msg += ": " + old + " -> " + value;
                        msg += "\n";
                    }
                }
            }
            return msg;
        }

        protected ProjectChangeHistory ProcessUpdateProjectRequest(HttpContext context, object update, Project p, User u) {
            ProjectChangeHistory pch = new ProjectChangeHistory();
            pch.message = ProcessUpdateRequest(context, update);
            if (pch.message.Length > 0) {
                pch.Project = p;
                pch.ChangedBy = u.Contact;
                pch.addSummaryObject(this);
            }
            return pch;
        }

        protected ProjectChangeHistory ProcessUpdateProjectArrayRequest<T>(string jsarr, List<T> cur,
            string comp, string[] lprops, object[] links, Table<T> table,
            Project p, User u) where T : class, IGetId<T>, new() 
        {
            return ProcessUpdateProjectArrayRequest<T, T>(jsarr, cur, comp, lprops, links, table, p, u);
        }

        protected ProjectChangeHistory ProcessUpdateProjectArrayRequest<T,S>(string jsarr, List<S> cur,
            string comp, string[] lprops, object[] links, Table<S> table,
            Project p, User u) 
            where T : class, S, new()
            where S : class, IGetId<S>
        {
            ProjectChangeHistory pch = new ProjectChangeHistory();
            pch.message = "";
            if (jsarr == null || jsarr.Equals("")) return pch;
            JArray arr = (JArray)JsonConvert.DeserializeObject(jsarr);
            T def = new T();

            for (int i = 0; i < arr.Count(); i++) {
                NameValueCollection map = new NameValueCollection();
                foreach (UpdateEntry ue in _dataMap) {
                    map.Set(ue.request_name, arr[i].Value<string>(ue.request_name));
                }

                string value = arr[i].Value<string>(comp);
                T upd = null;
                if(!isNull(value))
                    upd = (T) cur.SingleOrDefault(def.compareIds(new string[] { value }));
                if (upd == null) {
                    upd = new T();
                    for (int j = 0; j < lprops.Length && j < links.Length; j++) {
                        upd.GetType().GetProperty(lprops[j]).GetSetMethod().Invoke(upd, new object[] { links[j] });
                    }
                    pch.message += "New " + ProjectChangeHistory.getSpacedName(upd.GetType().Name) + " added:\n";
                }

                else {
                    cur.Remove(upd);
                }

                string msg = ProcessUpdateRequest(map, upd);
                if (msg.Length > 0) {
                    pch.message += msg;
                    pch.message += "\n";
                }
            }
            if (table != null && cur.Count > 0) {
                pch.message += "Removed " + cur.Count + " entries\n";
                table.DeleteAllOnSubmit(cur);
            }

            if (pch.message.Length > 0) {
                pch.Project = p;
                pch.ChangedBy = u.Contact;
                pch.addSummaryObject(this);
            }
            return pch;
        }

        protected void createIfNeeded<Q>(object status, string prop)
            where Q : new() 
        {
            Q o = (Q)status.GetType().GetProperty(prop).GetGetMethod().Invoke(status, null);
            if (o == null) {
                o = new Q();
                status.GetType().GetProperty(prop).GetSetMethod().Invoke(status, new object[] { o });
            }
        }

        protected string updateArray<T>(string jsarr, List<T> init, string comp, string[] values,
            string lprop, object link, Table<T> table, CookDBDataContext db)
            where T : SetMethod, IGetId<T>, new() 
        {
            return updateArray<T>(jsarr, init, comp, values, lprop, link, table, db, false);
        }

        protected string updateArray<T>(string jsarr, List<T> init, string comp, string[] values,
            string lprop, object link, Table<T> table, CookDBDataContext db, bool skipBlanks)
            where T : SetMethod, IGetId<T>, new() 
        {
            return updateArray<T>(jsarr, init, comp, values, new string[] { lprop }, new object[] { link },
                table, db, skipBlanks);
        }

        protected string updateArray<T>(string jsarr, List<T> init, string comp, string[] values,
            string[] lprops, object[] links, Table<T> table, CookDBDataContext db)
            where T : SetMethod, IGetId<T>, new() 
        {
            return updateArray<T>(jsarr, init, comp, values, lprops, links,
                table, db, false);
        }

        protected string updateArray<T>(string jsarr, List<T> cur, string comp, string[] values, 
            string[] lprops, object[] links, Table<T> table, CookDBDataContext db, bool skipBlanks)
            where T : SetMethod, IGetId<T>, new() 
        {
            bool skip = skipBlanks;
            string msg = "";
            if (jsarr == null || jsarr.Equals("")) return msg;
            JArray arr = (JArray)JsonConvert.DeserializeObject(jsarr);
            T def = new T();
            for (int i = 0; i < arr.Count(); i++) {
                string value = arr[i].Value<string>(comp);
                T o = null;
                if (!isNull(value)) {
                    o = cur.SingleOrDefault(def.compareIds(new string[] { value }));
                    skip = false; //got a value, create if not found
                }
                if (o == null && !skip) {
                    o = new T();
                    for(int j=0; j<lprops.Length && j<links.Length; j++) {
                        o.GetType().GetProperty(lprops[j]).GetSetMethod().Invoke(o, new object[] { links[j] });
                    }
                    msg += "\nNew " + ProjectChangeHistory.getSpacedName(o.GetType().Name) + " added:\n";
                }
                else if (o != null) {
                    cur.Remove(o);
                    msg += "\nUpdating existing " + ProjectChangeHistory.getSpacedName(o.GetType().Name) + ":\n";
                }

                if (o != null) {
                    foreach (string prop in values) {
                        msg += o.SetProperty(db, prop, arr[i].Value<string>(prop));
                    }
                }
            }
            table.DeleteAllOnSubmit(cur);
            return msg;
        }

    }
}
