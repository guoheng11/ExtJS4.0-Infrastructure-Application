using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Linq.Mapping;
using System.Data.Linq;

namespace Cookbook {

    public class GetStatus<T> : DatabaseHandler where T : ProjectStatus, new() {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db, User u) {
            Project p = FetchObjectById<Project>(db.Projects, context, "project_id");
            if (p == null)
                return new PagedData("Invalid project id", false);
            ProjectStatus o = (from a in p.ProjectStatus
                                      where (a is T)
                                      select a).OrderByDescending(a => a.Created.changed).FirstOrDefault();
            if (o != null) {
                return new PagedData(o.getHistoryInfo());
            }
            else {
                o = new T();
                p.ProjectStatus.Add(o);
                ProjectChangeHistory pch = new ProjectChangeHistory();
                pch.Project = p;
                pch.ChangedBy = u.Contact;
                pch.message = "Update status to " + ProjectChangeHistory.getSpacedName(this.GetType().Name.Remove(0, 3));
                o.Created = pch;

                db.SubmitChanges();
                return new PagedData(o.getHistoryInfo());
            }
        }
    }

    public class StatusInfo {
        public int project_status_id;
        public int project_id;
        public string status_type;
        public DateTime created;
        public string created_by;

        public StatusInfo(ProjectStatus psh) {
            this.project_status_id = psh.project_status_id;
            this.project_id = psh.project_id;
            this.status_type = psh.status_type;
            this.created = psh.Created.changed;
            this.created_by = psh.Created.ChangedBy.contact_name;
        }
    }

    public abstract class UpdateStatus<T> : UpdateObject where T : ProjectStatus, new() {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db, User u) {
            Project p = FetchObjectById<Project>(db.Projects, context, "project_id", false);
            if (p == null)
                return new PagedData("Invalid project id", false);

            T status;
            if (p.CurrentStatus == null || !(p.CurrentStatus is T)) {
                status = new T();
                p.ProjectStatus.Add(status);
            }
            else {
                status = (T)p.CurrentStatus;
            }

            ProjectChangeHistory pch = ProcessStatusRequest(context, db, u, p, status);
            if (status.Created == null)
                status.Created = pch;

            db.SubmitChanges();
            return new PagedData(status.created_change_id);
        }

        public virtual ProjectChangeHistory ProcessStatusRequest(HttpContext context, CookDBDataContext db, User u, Project p, T status) {
            return ProcessUpdateProjectRequest(context, status, p, u);
        }
    }

    public partial class ProjectStatus {
        public virtual object getBasicHistoryInfo() {
            return new StatusInfo(this);
        }

        public virtual object getHistoryInfo() {
            return this.getBasicHistoryInfo();
        }
    }

}
