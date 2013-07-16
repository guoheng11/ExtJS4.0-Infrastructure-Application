using System.Linq;
using System.Linq.Expressions;
using System;
using System.Data.Linq;
using System.Reflection;
using System.Data.Linq.Mapping;
using System.Web;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Collections;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.Web.Configuration;

namespace System.Linq.Dynamic {
    public static class DynamicQueryable {
        public static int Count(this IQueryable source) {
            if (source == null) throw new ArgumentNullException("source");
            return (int)source.Provider.Execute(
                Expression.Call(
                    typeof(Queryable), "Count",
                    new Type[] { source.ElementType }, source.Expression));
        }

        public static IQueryable Take(this IQueryable source, int count)
        {
            if (source == null) throw new ArgumentNullException("source");
            return source.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable), "Take",
                    new Type[] { source.ElementType },
                    source.Expression, Expression.Constant(count)));
        }

        public static IQueryable Skip(this IQueryable source, int count)
        {
            if (source == null) throw new ArgumentNullException("source");
            return source.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable), "Skip",
                    new Type[] { source.ElementType },
                    source.Expression, Expression.Constant(count)));
        }
    }
}

namespace Cookbook {
    public interface IGetId<T> {
        Func<T,bool> compareIds(string[] ids);
    }

    public class SetMethod {
        public virtual string SetProperty(CookDBDataContext db, string prop, string value) {
            string msg = "";
            if (value != null)
            {
                object old = this.GetType().GetProperty(prop).GetGetMethod().Invoke(this, null);
                if (!value.Equals(old))
                {
                    this.GetType().GetProperty(prop).GetSetMethod().Invoke(this, new object[] { value });
                    msg = prop + ": " + old + " -> " + value + "\n";
                }
            }
            return msg;
        }
    }

    public partial class ProjectStatus : IGetId<ProjectStatus> {
        public Func<ProjectStatus, bool> compareIds(string[] ids) {
            return (a => a.project_status_id == int.Parse(ids[0]));
        }
    }

    public partial class View : IGetId<View>
    {
        #region IGetId<View> Members

        public Func<View, bool> compareIds(string[] ids)
        {
            return (a => a.view_id == int.Parse(ids[0]));
        }

        #endregion
    }

    public partial class BusinessUnit
    {
        public string getBUDirectory()
        {
            string basepath = WebConfigurationManager.AppSettings["projectBasePath"];
            return Path.Combine(Path.Combine(basepath, Company.company_name) , biz_name);
        }
    }

    public partial class Option : IGetId<Option> {

        public Func<Option, bool> compareIds(string[] ids) {
            return (a => a.option_id == int.Parse(ids[0]));
        }
    }

    public partial class ProjectChangeHistory {

        partial void OnCreated() {
            this.changed = DateTime.Now;
        }

        public string getMessageSummary() {
            int len = this.message.IndexOf(':');
            if (len < 0) return "";
            string ret = this.message.Substring(0, len);
            return getSpacedName(ret);
        }

        public static string getSpacedName(string name) {
            return Regex.Replace(name, @"(\B[A-Z])", @" $1");
        }

        public void addSummaryObject(object o) {
            this.message = getSpacedName(o.GetType().Name) + ":\n" + this.message;
        }

        public void addSummaryIfBlank(object o) {
            if (this.message.Length == 0)
                addSummaryObject(o);
        }
    }

    public partial class Contact : IGetId<Contact> {

        public Func<Contact,bool> compareIds(string[] ids) {
            return (a => a.contact_id == int.Parse(ids[0]));
        }

        public static string getContactName(CookDBDataContext db, int id) {
            return db.Contacts.Single(a => a.contact_id == id).contact_name;
        }

        public static void sendEmail(IEnumerable<Contact> contacts, string subject, string msg)
        {
            sendEmail(contacts, null, subject, msg, false);
        }
        public static void sendEmail(IEnumerable<Contact> contacts, IEnumerable<Contact> cc, string subject, string msg)
        {
            sendEmail(contacts, cc, subject, msg, false);
        }
        public static void sendEmail(IEnumerable<Contact> contacts, IEnumerable<Contact> cc, string subject, string msg, bool isHtml)
        {
            MailMessage message = new MailMessage();
            message.Subject = subject;
            message.From = new MailAddress("Cookbook@usani.com");
            message.IsBodyHtml = isHtml;

            msg += "\n\nThis is an automatically generated message from the Cookbook. " + WebConfigurationManager.AppSettings["email_link"];
            message.Body = msg;

            foreach(Contact c in contacts) {
                string email = c.getPrimaryEmail();
                if(email != null && email.EndsWith("@usan.com")) {
                    message.To.Add(email);
                }
                if (c.User != null)
                {
                    foreach(UserBackup ub in c.User.UserBackups) {
                        email = ub.Contact.getPrimaryEmail();
                        if (email != null && email.EndsWith("@usan.com"))
                        {
                            message.CC.Add(email);
                        }
                    }
                }
            }

            if (cc != null)
            {
                foreach (Contact c in cc)
                {
                    string email = c.getPrimaryEmail();
                    if (email != null && email.EndsWith("@usan.com"))
                    {
                        message.CC.Add(email);
                    }
                }
            }

            SmtpClient smtp = new SmtpClient();
            smtp.Send(message);
            message.Dispose();
        }

        public void Notify(string subject, string msg) {
            Contact.sendEmail(new Contact[] { this }, subject, msg);
        }

        public string getPrimaryEmail() {
            EmailAddress em = this.EmailAddresses.SingleOrDefault(a => a.primary);
            if (em == null) {
                if (this.EmailAddresses.Count > 0)
                    return this.EmailAddresses.First().email;
                else return null;
            }
            return em.email;
        }
    }

    public partial class Group : IGetId<Group> {
        public Func<Group,bool> compareIds(string[] ids) {
            return (a => a.group_id == int.Parse(ids[0]));
        }
    }

    public partial class User {
        public string getGroups() {
            string ret = "";
            bool first = true;
            foreach (UserGroup ug in this.UserGroups) {
                if (ug.validated) {
                    ret += (first ? "" : ",") + ug.Group.group_name;
                    first = false;
                }
            }
            return ret;
        }

        /// <summary>
        /// Populate the given permission group with this user's permissions
        /// </summary>
        /// <param name="db">DB Context</param>
        /// <param name="pg">The permission group to populate</param>
        /// <returns>The passed-in permission group with this user's permissions</returns>
        public PermissionGroup getPermissionGroup(PermissionGroup pg) {
            return this.UserGroups.Where(a => a.validated).Select(a => a.Group)
                .Aggregate(pg, pg.addPermissionsFromGroup);
        }

        public bool getPermission(string name) {
            PermissionGroup pg = this.getPermissionGroup(new PermissionGroup());
            return (bool)pg.GetType().GetField(name).GetValue(pg);
        }
    }

    public partial class PhoneNumber : SetMethod, IGetId<PhoneNumber> {
        public Func<PhoneNumber,bool> compareIds(string[] ids) {
            return (a => a.phone.Equals(ids[0]));
        }
    }

    public partial class EmailAddress : SetMethod, IGetId<EmailAddress> {
        public override string SetProperty(CookDBDataContext db, string prop, string value) {
            if (prop.Equals("primary")) {
                if (!DatabaseHandler.isNull(value)) {
                    bool p = bool.Parse(value);
                    if (this.primary != p) {
                        string msg = prop + ": " + this.primary + " -> " + p + "\n";
                        this.primary = p;
                        return msg;
                    }
                }
                return "";
            }
            return base.SetProperty(db, prop, value);
        }
        /*
        public bool compareId(string id) {
            return this.email.Equals(id);
        }*/

        public Func<EmailAddress,bool> compareIds(string[] ids) {
            return (a => a.email.Equals(ids[0]));
        }
    }

    public partial class Assessment : IGetId<Assessment> {
        public Func<Assessment,bool> compareIds(string[] ids) {
            return (a => a.assessment_id == int.Parse(ids[0]));
        }
    }

    public partial class AssessmentHour : SetMethod, IGetId<AssessmentHour>  {
        
        public override string SetProperty(CookDBDataContext db, string prop, string value) {
            string msg = "";
            bool add = true;
            if (prop.Equals("hours")) {
                decimal h = Decimal.Parse(value);
                if (!h.Equals(this.hours)) {
                    msg += this.hours + " -> " + h;
                    this.hours = h;
                }
            }
            else if (prop.Equals("contact_id")) {
                if (!DatabaseHandler.isNull(value)) {
                    int cid = int.Parse(value);
                    if (cid != this.contact_id) {
                        msg += (this.Contact != null ? this.Contact.contact_name : "") + " -> " 
                            + Contact.getContactName(db, cid);
                        this.contact_id = cid;
                    }
                }
            }
            else if (prop.Equals("hour_type")) {
                int ht = int.Parse(value);
                if (ht != this.hour_type) {
                    msg += (this.AssessmentHourType != null ? this.AssessmentHourType.assessment_hour_type : "") + " -> "
                        + db.AssessmentHourTypes.Single(a => a.assessment_hour_type_id == ht).assessment_hour_type;
                    this.hour_type = ht;
                }
            }
            else {
                //description
                add = false;
                msg = base.SetProperty(db, prop, value);
            }
            if (add && msg.Length > 0)
                msg = prop + ": " + msg + "\n";
            return msg;
        }

        public Func<AssessmentHour,bool> compareIds(string[] ids) {
            try {
                int i = int.Parse(ids[0]);
                return (a => a.assessment_hour_id == i);
            }
            catch {
                return (a => false);
            }
        }
    }

    public partial class AssessmentContact : SetMethod, IGetId<AssessmentContact> {
        public override string SetProperty(CookDBDataContext db, string prop, string value) {
            string msg = prop + ": ";
            if (prop.Equals("contact_id")) {
                if (!DatabaseHandler.isNull(value)) {
                    int cid = int.Parse(value);
                    if (cid != this.contact_id) {
                        msg += (this.Contact != null ? this.Contact.contact_name : "") + " -> "
                            + Contact.getContactName(db, cid);
                        this.contact_id = cid;
                    }
                }
            }
            return msg;
        }

        public Func<AssessmentContact,bool> compareIds(string[] ids) {
            return (a => a.contact_id == int.Parse(ids[0]));
        }

        public void NotifyContact() {
            string pname = this.Assessment.Option.Project.project_number;
            this.Contact.Notify("[Cookbook] " + pname + " ready for assessment", 
                "Project " + pname + " is ready for your assessment.\n\nProject Link: "+CookbookTools.CreateProjectLink(this.Assessment.Option.Project.project_id));
        }
    }

    public partial class AssessmentHardware : SetMethod, IGetId<AssessmentHardware> {
        public Func<AssessmentHardware,bool> compareIds(string[] ids) {
            return (a => a.hardware_id == int.Parse(ids[0]));
        }

        public override string SetProperty(CookDBDataContext db, string prop, string value) {
            string msg = "";
            bool add = true;
            if(prop.Equals("unit_cost")) {
                decimal cost = Decimal.Parse(value);
                if (!cost.Equals(this.unit_cost)) {
                    msg += this.unit_cost + " -> " + cost;
                    this.unit_cost = cost;
                }
            }
            else if (prop.Equals("quantity")) {
                int q = int.Parse(value);
                if (!q.Equals(this.quantity)) {
                    msg += this.quantity + " -> " + q;
                    this.quantity = q;
                }
            }
            else {
                add = false;
                msg = base.SetProperty(db, prop, value);
            }
            if (add && msg.Length > 0)
                msg = prop + ": " + msg + "\n";
            return msg;
        }
    }

    public partial class Assumption : SetMethod, IGetId<Assumption> {

        public Func<Assumption,bool> compareIds(string[] ids) {
            try {
                int i = int.Parse(ids[0]);
                return (a => a.assumption_id == i);
            }
            catch {
                return (a => false);
            }
        }

        public override string SetProperty(CookDBDataContext db, string prop, string value) {
            string msg = "";
            bool add = true;
            if (prop.Equals("standard")) {
                bool standard = bool.Parse(value);
                if (standard != this.standard) {
                    msg += this.standard + " -> " + standard;
                    this.standard = standard;
                }
            }
            else {
                add = false;
                msg = base.SetProperty(db, prop, value);
            }
            if (add && msg.Length > 0)
                msg = prop + ": " + msg + "\n";
            return msg;
        }
    }

    public partial class ProjectContact {
        public static IQueryable<ProjectContact> getContactsFromRequest(CookDBDataContext db, HttpRequest req) {
            IQueryable<ProjectContact> q = db.ProjectContacts;

            if (!DatabaseHandler.isNull(req.Params.Get("project_id"))) {
                q = q.Where(a => a.project_id == int.Parse(req.Params.Get("project_id")));
            }

            if (!DatabaseHandler.isNull(req.Params.Get("contact_id"))) {
                q = q.Where(a => a.contact_id == int.Parse(req.Params.Get("contact_id")));
            }

            if (!DatabaseHandler.isNull(req.Params.Get("contact_type"))) {
                q = q.Where(a => a.contact_type == int.Parse(req.Params.Get("contact_type")));
            }
            return q;
        }
    }

    public partial class PromptList : IGetId<PromptList> {
        public Func<PromptList,bool> compareIds(string[] ids) {
            return (a => a.language.Equals(ids[0]));
        }
    }

    public partial class Prompt : IGetId<Prompt> {
        public Func<Prompt,bool> compareIds(string[] ids) {
            return (a => a.prompt_id == int.Parse(ids[0]));
        }
    }

    public partial class RoutingUpdate : IGetId<RoutingUpdate> {

        private Note note
        {
            get
            {
                string type = "Routing" + this.routing_id;
                return Project.Notes.Where(a => a.type.Equals(type)).SingleOrDefault(); ;
            }
            set
            {
                Note n = value;
                n.type = "Routing" + this.routing_id;
                n.Project = Project;
                n.made = DateTime.Now;
            }
        }

        public string notetext
        {
            get
            {
                if (note == null)
                    return null;
                return note.text;
            }
            set
            {
                if (note == null)
                {
                    note = new Note();
                }
                note.text = value;
                note.changed = DateTime.Now;
            }
        }

        public Func<RoutingUpdate,bool> compareIds(string[] ids) {
            return (a => a.routing_id == int.Parse(ids[0]));
        }
    }

    public partial class Note : IGetId<Note> {

        public Func<Note,bool> compareIds(string[] ids) {
            return (a => a.note_id == int.Parse(ids[0]));
        }

        public object getNoteInfo(User u) {
            return new {
                this.note_id,
                this.made,
                made_by = this.MadeBy.contact_name,
                this.text,
                read_only = (this.made_by != u.contact_id),
            };
        }

        public static IQueryable<Note> getIfqNotes(CookDBDataContext db)
        {
            IQueryable<string> types = db.IFQNoteTypes.Select(a => a.ifq_note_type);
            return db.Notes.Where(a => types.Contains(a.type));
        }
    }

    [InheritanceMapping(Code = "Generic Ingredient", Type = typeof(ProjectIngredient), IsDefault=true)]
    [InheritanceMapping(Code = "Application Update", Type = typeof(ApplicationUpdate))]
    [InheritanceMapping(Code = "Table Update", Type = typeof(TableUpdate))]
    [InheritanceMapping(Code = "Executable Update", Type = typeof(ExecutableUpdate))]
    [InheritanceMapping(Code = "Other Update", Type = typeof(OtherUpdate))]
    //[InheritanceMapping(Code = "Account Update", Type = typeof(AccountUpdate))]
    //[InheritanceMapping(Code = "CMR Update", Type = typeof(CMRUpdate))]
    //[InheritanceMapping(Code = "Readi800 Update", Type = typeof(Readi800Update))]
    //[InheritanceMapping(Code = "AccessUSAN Update", Type = typeof(AccessUSANAccountUpdate))]
    public partial class ProjectIngredient : IGetId<ProjectIngredient> {

        private Note note
        {
            get
            {
                string type = "Ingredient" + this.ingredient_id;
                return Project.Notes.Where(a => a.type.Equals(type)).SingleOrDefault();
            }
            set
            {
                Note n = value;
                n.type = "Ingredient" + this.ingredient_id;
                n.Project = Project;
                n.made = DateTime.Now;
            }
        }

        public string notetext
        {
            get
            {
                if (note == null)
                    return null;
                return note.text;
            }
            set 
            {
                if (note == null)
                {
                    note = new Note();
                }
                note.text = value;
                note.changed = DateTime.Now;
            }
        }

        public virtual string getName() {
            return this.type;
        }

        public Func<ProjectIngredient, bool> compareIds(string[] ids) {
            return (a => a.ingredient_id == int.Parse(ids[0]));
        }

    }

    public partial class ApplicationUpdate {
        public override string getName() {
            return this.app_name;
        }
    }

    public partial class TableUpdate {
        public override string getName() {
            return this.table_name;
        }
    }

    public partial class ExecutableUpdate {
        public override string getName() {
            return this.exe_name;
        }
    }

    /*
    public partial class AccountUpdate {
        public override string getName() {
            return this.account_id;
        }
    }*/

    public partial class PromptLanguage
    {
        partial void OnCreated()
        {
            this.added = DateTime.Now;
        }
    }

    public partial class SystemsUpdate : IGetId<SystemsUpdate>
    {

        public Func<SystemsUpdate, bool> compareIds(string[] ids)
        {
            return (a => a.sys_update_id == int.Parse(ids[0]));
        }

    }

    public partial class MISUpdate : IGetId<MISUpdate>
    {

        public Func<MISUpdate, bool> compareIds(string[] ids)
        {
            return (a => a.mis_update_id == int.Parse(ids[0]));
        }
    }

    public partial class MISDistributionUpdate : SetMethod, IGetId<MISDistributionUpdate>
    {

        public Func<MISDistributionUpdate, bool> compareIds(string[] ids)
        {
            return (a => a.mis_email_update_id == int.Parse(ids[0]));
        }
    }

    public partial class MISDnisUpdate : SetMethod, IGetId<MISDnisUpdate>
    {
        private Note note
        {
            get
            {
                string type = "MISDnisUpdate" + this.mis_dnis_update_id;
                return MISUpdate.Project.Notes.Where(a => a.type.Equals(type)).SingleOrDefault();
            }
            set
            {
                Note n = value;
                n.type = "MISDnisUpdate" + this.mis_dnis_update_id;
                n.Project = MISUpdate.Project;
                n.made = DateTime.Now;
            }
        }

        public string notetext
        {
            get
            {
                if (note == null)
                    return null;
                return note.text;
            }
            set
            {
                if (note == null)
                {
                    note = new Note();
                }
                note.text = value;
                note.changed = DateTime.Now;
            }
        }

        public Func<MISDnisUpdate, bool> compareIds(string[] ids)
        {
            return (a => a.mis_dnis_update_id == int.Parse(ids[0]));
        }
    }

    public partial class Table : IGetId<Table>
    {
        public Func<Table, bool> compareIds(string[] ids)
        {
            return (a => a.table_name.Equals(ids[0]));
        }
    }
}