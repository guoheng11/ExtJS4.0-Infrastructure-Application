using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;

namespace Cookbook {
    public class PermissionGroup {
        public bool createContact;
        public bool createProject;
        public bool deleteContact;
        public bool deleteProject;
        public bool editContact;
        public bool revokeUsers;
        public bool validateUsers;
        public bool approvePO;
        public bool requestPO;

        public PermissionGroup() {
            //set all permissions to false
            foreach (FieldInfo f in this.GetType().GetFields()) {
                if (f.FieldType.Equals(true.GetType()))
                    f.SetValue(this, false);
            }
        }

        public PermissionGroup addPermissionsFromGroup(PermissionGroup total, Group group) {
            Type t = total.GetType();
            foreach (FieldInfo f in t.GetFields()) {
                if (f.FieldType.Equals(true.GetType())) {
                    bool cur = (bool)f.GetValue(total);
                    cur = cur || ((bool)group.GetType().GetProperty(f.Name).GetGetMethod().Invoke(group, null));
                    f.SetValue(total, cur);
                }
            }
            return total;
        }
    }

    public class UserPermission : PermissionGroup {

        public string name;
        public string groups;
        public string message;
        public string login;

        public int? project_view_id;
        public int? download_view_id;

        public UserPermission(string name, string groups, string message, string login)
            : base() {
            this.name = name;
            this.groups = groups;
            this.message = message;
            this.login = login;
        }

        /// <summary>
        /// Create User permissions object
        /// </summary>
        /// <param name="u">The user to get permissions for. NULL is not allowed.</param>
        /// 
        public UserPermission(User u)
            : base() {
            this.name = u.Contact.contact_name;
            this.groups = u.getGroups();
            this.message = "";
            this.login = u.username;
            this.project_view_id = u.project_view_id;
            this.download_view_id = u.download_view_id;

            u.getPermissionGroup(this);
        }
    }

    public class GroupPermission : PermissionGroup {
        public string group_name;
        public int group_id;

        public GroupPermission(Group g) : base() {
            this.group_id = g.group_id;
            this.group_name = g.group_name;

            base.addPermissionsFromGroup(this, g);
        }
    }
}
