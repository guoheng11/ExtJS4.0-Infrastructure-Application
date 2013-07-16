using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook {
    public abstract class AddNote<T> : UpdateObject where T : Note, new() {

        public AddNote() {
            addUpdateEntry("text", "text", false);
        }

        public override PagedData  ProcessRequest(HttpContext context, CookDBDataContext db, User u)
        {
            T note = new T();
            note.MadeBy = u.Contact;
            note.made = DateTime.Now;
            bool retval = ProcessNoteRequest(context, db, u, note);

            if (retval) {
                db.Notes.InsertOnSubmit(note);
                db.SubmitChanges();
            }

            return new PagedData(new { note.note_id }, retval);
        }

        public virtual bool ProcessNoteRequest(HttpContext context, CookDBDataContext db, User u, T note) {
            ProcessUpdateRequest(context, note);
            return true;
        }
    }
}
