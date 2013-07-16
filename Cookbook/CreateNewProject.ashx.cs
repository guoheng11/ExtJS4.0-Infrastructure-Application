using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for CreateNewProject
    /// </summary>
    public class CreateNewProject : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {

            string user_name = context.Request.Params.Get("user_name");
            if (isNull(user_name))
            {
                return new PagedData("CreateNewProject.ashx expects a user_name");
            }

            ProjectInformation newProject = new ProjectInformation();
            newProject.locked = true;           //start the project off as locked by the user who created it
            newProject.user_name = user_name;   //
            db.ProjectInformations.InsertOnSubmit(newProject);
            db.SubmitChanges();  //create the new project so we can have a new project_id with which to create new records in other tables


            //create a new record in dependent tables
            MISNew newMISNew = new MISNew();
            newMISNew.project_id = newProject.project_id;
            db.MISNews.InsertOnSubmit(newMISNew);
            db.SubmitChanges();

            MISNewDelivery newMISDelivery = new MISNewDelivery();
            newMISDelivery.mis_new_id = newMISNew.mis_new_id;
            db.MISNewDeliveries.InsertOnSubmit(newMISDelivery);

            MISUpdate newMISUpdate = new MISUpdate();
            newMISUpdate.project_id = newProject.project_id;
            newMISUpdate.description = "";
            db.MISUpdates.InsertOnSubmit(newMISUpdate);
            db.SubmitChanges();

            MISUpdateDeliveryChange newMISUpdateDeliveryChange = new MISUpdateDeliveryChange();
            newMISUpdateDeliveryChange.mis_update_id = newMISUpdate.mis_update_id;
            db.MISUpdateDeliveryChanges.InsertOnSubmit(newMISUpdateDeliveryChange);

            ProdInstallationBuffet prodBuffet = new ProdInstallationBuffet();
            prodBuffet.project_id = newProject.project_id;
            db.ProdInstallationBuffets.InsertOnSubmit(prodBuffet);

            PromptWorksheet promptWorksheet = new PromptWorksheet();
            promptWorksheet.project_id = newProject.project_id;
            promptWorksheet.prompt_worksheet = "";
            promptWorksheet.prompt_summary = "";
            db.PromptWorksheets.InsertOnSubmit(promptWorksheet);

            SWDSchedule swdSchedule = new SWDSchedule();
            swdSchedule.project_id = newProject.project_id;
            db.SWDSchedules.InsertOnSubmit(swdSchedule);

            TrafficRequirement trafficRequirement = new TrafficRequirement();
            trafficRequirement.project_id = newProject.project_id;
            db.TrafficRequirements.InsertOnSubmit(trafficRequirement);

            UatProdInstall uatProdInstall = new UatProdInstall();
            uatProdInstall.project_id = newProject.project_id;
            db.UatProdInstalls.InsertOnSubmit(uatProdInstall);

            db.SubmitChanges();

            //insert a history note that the project was created
            ProjectHistory historyNote = new ProjectHistory();
            historyNote.project_id = newProject.project_id;
            historyNote.user_name = user_name;
            historyNote.description = "Project created";
            historyNote.date = DateTime.Today.ToString("yyyy-MM-dd");
            db.ProjectHistories.InsertOnSubmit(historyNote);

            db.SubmitChanges();

            return new PagedData(new { newProject.project_id });
        }

    }
}