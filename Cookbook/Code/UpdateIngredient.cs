using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook {
    public abstract class UpdateIngredient<T> : UpdateObject where T : ProjectIngredient, new() {

        public UpdateIngredient() {
            addUpdateEntry("new_ingredient", "new", EntryType.BOOLEAN);
            addUpdateEntry("description", "description");
            addUpdateEntry("note", "notetext", false);
        }

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db, User u) {
            Project p = FetchObjectById<Project>(db.Projects, context, "project_id");
            if (p == null)
                return new PagedData("Invalid project id", false);

            ProjectChangeHistory pch = ProcessUpdateProjectArrayRequest<T,ProjectIngredient>(
                context.Request.Params.Get("ingredient_list"),
                p.ProjectIngredients.Where(a => a is T).ToList(),
                "ingredient_id", new string[] { "Project" }, new object[] { p },
                db.ProjectIngredients, p, u);

            db.SubmitChanges();
            return new PagedData("");
        }
    }
}
