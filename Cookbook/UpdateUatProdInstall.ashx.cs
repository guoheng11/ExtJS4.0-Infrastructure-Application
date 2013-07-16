using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    /// <summary>
    /// Summary description for UpdateUatProdInstall
    /// </summary>
    public class UpdateUatProdInstall : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            string comments = "comments: ";
            string filter = context.Request.Params.Get("project_id");
            //string panelHeaders = context.Request.Params.Get("panel_headers");

            if (!isNull(filter))
            {
                try
                {
                    UatProdInstall currProjUATInfo = db.UatProdInstalls.Single(a => a.project_id.Equals(int.Parse(filter)));

                    //UAT Install Details
                    currProjUATInfo.uat_install_date = processRecord(blob["uatprodinstallUATInstallDate"]);
                    currProjUATInfo.uat_install_node = processRecord(blob["uatprodinstallUATInstallNodes"]);
                    currProjUATInfo.uat_install_comments = processRecord(blob["uatprodinstallUATInstallComments"]);
                    if (blob["uatInstallDetailsStagingFolderId"] != null)
                    {
                        if (blob["uatInstallDetailsStagingFolderId"].GetType() == typeof(JValue))
                        {
                            StagingFolder link = db.StagingFolders.Single(a => a.staging_folder_id.Equals((String)blob["uatInstallDetailsStagingFolderId"]));
                            link.folder = (String)blob["uatInstallStagingFolderLink"];
                            link.notes = (String)blob["uatInstallStagingFolderNotes"];
                        }
                        else
                        {
                            for (int i = 0; i < ((JArray)blob["uatInstallDetailsStagingFolderId"]).Count; i++)
                            {
                                StagingFolder link = db.StagingFolders.Single(a => a.staging_folder_id.Equals((String)((JArray)blob["uatInstallDetailsStagingFolderId"])[i]));
                                link.folder = (String)((JArray)blob["uatInstallStagingFolderLink"])[i];
                                link.notes = (String)((JArray)blob["uatInstallStagingFolderNotes"])[i];
                            }
                        }
                    }

                    //PROD Install Details
                    currProjUATInfo.uat_date = processRecord(blob["uatprodinstallUatDate"]);
                    currProjUATInfo.uat_node = processRecord(blob["uatprodinstallUatNode"]);
                    currProjUATInfo.uat_usan_ccr = processRecord(blob["uatprodinstallUatUsanCCR"]);
                    currProjUATInfo.uat_ccr = processRecord(blob["uatprodinstallUatCCR"]);
                    currProjUATInfo.uat_maintenance_start = processRecord(blob["uatprodinstallUatMaintenanceStart"]);
                    currProjUATInfo.uat_conference_start = processRecord(blob["uatprodinstallUatConferenceStart"]);
                    currProjUATInfo.uat_conference_bridge = processRecord(blob["uatprodinstallUatConferenceBridge"]);
                    currProjUATInfo.prod_post_install_notification = processRecord(blob["uatprodinstallProductionPostInstallNotification"]);
                    currProjUATInfo.prod_install_comments = processRecord(blob["uatprodinstallProdInstallComments"]);
                    if (blob["productionInstallDetailsStagingFolderId"] != null)
                    {
                        if (blob["productionInstallDetailsStagingFolderId"].GetType() == typeof(JValue))
                        {
                            StagingFolder link = db.StagingFolders.Single(a => a.staging_folder_id.Equals((String)blob["productionInstallDetailsStagingFolderId"]));
                            link.folder = (String)blob["productionInstallStagingFolderLink"];
                            link.notes = (String)blob["productionInstallStagingFolderNotes"];
                        }
                        else
                        {
                            for (int i = 0; i < ((JArray)blob["productionInstallDetailsStagingFolderId"]).Count; i++)
                            {
                                StagingFolder link = db.StagingFolders.Single(a => a.staging_folder_id.Equals((String)((JArray)blob["productionInstallDetailsStagingFolderId"])[i]));
                                link.folder = (String)((JArray)blob["productionInstallStagingFolderLink"])[i];
                                link.notes = (String)((JArray)blob["productionInstallStagingFolderNotes"])[i];
                            }
                        }
                    }
                    
                    //SOAK Install Details
                    //panel 1 - SCU
                    currProjUATInfo.scu_date = processRecord(blob["uatprodinstallSoakPanel1Date"]);
                    currProjUATInfo.scu_node = processRecord(blob["uatprodinstallSoakPanel1Node"]);
                    currProjUATInfo.scu_usan_ccr = processRecord(blob["uatprodinstallSoakPanel1UsanCCR"]);
                    currProjUATInfo.scu_ccr = processRecord(blob["uatprodinstallSoakPanel1CCR"]);
                    currProjUATInfo.scu_maintenance_start = processRecord(blob["uatprodinstallSoakPanel1MaintenanceStart"]);
                    currProjUATInfo.column1 = processRecord(blob["uatProdInstallSoakPanel1Hidden"]);
                    //panel 2 - WOR
                    currProjUATInfo.wor_date = processRecord(blob["uatprodinstallSoakPanel2Date"]);
                    currProjUATInfo.wor_node = processRecord(blob["uatprodinstallSoakPanel2Node"]);
                    currProjUATInfo.wor_usan_ccr = processRecord(blob["uatprodinstallSoakPanel2UsanCCR"]);
                    currProjUATInfo.wor_ccr = processRecord(blob["uatprodinstallSoakPanel2CCR"]);
                    currProjUATInfo.wor_maintenance_start = processRecord(blob["uatprodinstallSoakPanel2MaintenanceStart"]);
                    currProjUATInfo.column2 = processRecord(blob["uatProdInstallSoakPanel2Hidden"]);
                    //panel 3 - CPZ
                    currProjUATInfo.cpz_date = processRecord(blob["uatprodinstallSoakPanel3Date"]);
                    currProjUATInfo.cpz_node = processRecord(blob["uatprodinstallSoakPanel3Node"]);
                    currProjUATInfo.cpz_usan_ccr = processRecord(blob["uatprodinstallSoakPanel3UsanCCR"]);
                    currProjUATInfo.cpz_ccr = processRecord(blob["uatprodinstallSoakPanel3CCR"]);
                    currProjUATInfo.cpz_maintenance_start = processRecord(blob["uatprodinstallSoakPanel3MaintenanceStart"]);
                    currProjUATInfo.column3 = processRecord(blob["uatProdInstallSoakPanel3Hidden"]);
                    //panel 4 - Prod
                    currProjUATInfo.prod_date = processRecord(blob["uatprodinstallSoakPanel4Date"]);
                    currProjUATInfo.prod_node = processRecord(blob["uatprodinstallSoakPanel4Node"]);
                    currProjUATInfo.prod_usan_ccr = processRecord(blob["uatprodinstallSoakPanel4UsanCCR"]);
                    currProjUATInfo.prod_ccr = processRecord(blob["uatprodinstallSoakPanel4CCR"]);
                    currProjUATInfo.prod_maintenance_start = processRecord(blob["uatprodinstallSoakPanel4MaintenanceStart"]);
                    currProjUATInfo.column4 = processRecord(blob["uatProdInstallSoakPanel4Hidden"]);

                    currProjUATInfo.post_install_notification = processRecord(blob["uatprodinstallSoakPostInstallNotification"]);
                    currProjUATInfo.comments = processRecord(blob["uatprodinstallSoakInstallComments"]);
                    if (blob["soakInstallDetailsStagingFolderId"] != null)
                    {
                        if (blob["soakInstallDetailsStagingFolderId"].GetType() == typeof(JValue))
                        {
                            StagingFolder link = db.StagingFolders.Single(a => a.staging_folder_id.Equals((String)blob["soakInstallDetailsStagingFolderId"]));
                            link.folder = (String)blob["soakInstallStagingFolderLink"];
                            link.notes = (String)blob["soakInstallStagingFolderNotes"];
                        }
                        else
                        {
                            for (int i = 0; i < ((JArray)blob["soakInstallDetailsStagingFolderId"]).Count; i++)
                            {
                                StagingFolder link = db.StagingFolders.Single(a => a.staging_folder_id.Equals((String)((JArray)blob["soakInstallDetailsStagingFolderId"])[i]));
                                link.folder = (String)((JArray)blob["soakInstallStagingFolderLink"])[i];
                                link.notes = (String)((JArray)blob["soakInstallStagingFolderNotes"])[i];
                            }
                        }
                    }

                    db.SubmitChanges();
                }
                catch (Exception e)
                {
                    return new PagedData("Error: Please show Cookbook Admin! " + e.ToString());
                }

                return new PagedData("Uat Prod Install saved. " + comments);
            }

            return new PagedData("UpdateUatProdInstall.ashx required a project_id");
        }

        public string processRecord(JToken blobField)
        {
            if (blobField != null)
            {
                if (blobField.GetType() == typeof(JValue))
                {
                    if ((String)blobField != null)
                    {
                        return (String)blobField;
                    }
                    else
                    {
                        return "";
                    }
                }
                else
                {
                    string vals = "";
                    if (((JArray)blobField).Count > 0)
                    {
                        for (int i = 0; i < ((JArray)blobField).Count; i++)
                        {
                            vals += (String)((JArray)blobField)[i];
                            if (i + 1 < ((JArray)blobField).Count)
                            {
                                vals += "; ";
                            }
                        }
                    }
                    return vals;
                }
            }
            else
            {
                return "";
            }
        }
    }
}