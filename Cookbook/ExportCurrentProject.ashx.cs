using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExcelLibrary.SpreadSheet;

namespace Cookbook
{

    public class ExportCurrentProject : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            {
                string comments = "Comments: ";
                string filter = context.Request.Params.Get("project_id");
                string user_name = context.Request.Params.Get("user_name");
                if (!isNull(filter) && filter != "0")
                {
                    using (new ImpersonateUser("cookbook", "USANAD", "987-oiu8"))
                    {
                        ProjectInformation projInfo = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));

                        string folder = projInfo.project_folder;
                        if (folder == "" || folder == null)
                        {
                            return new PagedData("Error - Project Folder Must Be Populated");
                        }
                        if ((folder.Reverse()).ToString().Substring(0, 1) != "\\") //add a slash to the network path if it doesn't already exist or it will be put in the parent dir
                        {
                            folder = folder + "\\";
                        }
                        string filename = projInfo.project_name.Replace(' ', '_') + DateTime.Today.Year + DateTime.Today.Month + DateTime.Today.Day +
                            "_" + DateTime.Now.Hour + DateTime.Now.Minute + "_BAK" + ".xls";
                        string file = folder + filename;

                        Workbook workbook = new Workbook();
                        Worksheet summaryTab = new Worksheet("Summary Tab");

                        /*
                         * fill first 200 cells with null data - this is a workaround using the ExcelLibrary so that a warning 
                         * prompt will not show when opening the file. File needs to be >6000 bytes for the warning not to show up...don't ask me...
                         */
                        for (var k = 0; k < 200; k++)
                            summaryTab.Cells[k, 0] = new Cell(null);

                        //SUMMARY TAB
                        try
                        {
                            summaryTab.Cells[0, 0] = new Cell("Summary Tab Data");
                            summaryTab.Cells[0, 1] = new Cell("Exported by: " + user_name + " on " + DateTime.Today.Month + "/" + DateTime.Today.Day + "/" + DateTime.Today.Year +
                            " at " + DateTime.Now.Hour + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0'));
                            summaryTab.Cells[2, 0] = new Cell("Project ID: " + projInfo.project_id);
                            summaryTab.Cells[3, 0] = new Cell("Project Name: " + projInfo.project_name);
                            summaryTab.Cells[4, 0] = new Cell("Project Number: " + projInfo.project_number);
                            summaryTab.Cells[5, 0] = new Cell("Customer Project Number: " + projInfo.customer_project_number);
                            summaryTab.Cells[6, 0] = new Cell("Company: " + projInfo.company);
                            summaryTab.Cells[7, 0] = new Cell("Primary Business Unit: " + projInfo.primary_business_unit);
                            summaryTab.Cells[8, 0] = new Cell("Additional Business Units: " + projInfo.additional_business_units);
                            summaryTab.Cells[9, 0] = new Cell("RFQ LOE Recv Date: " + projInfo.rfq_loe_recv_date);
                            summaryTab.Cells[10, 0] = new Cell("Quote LOE Due Date: " + projInfo.quote_loe_due_date);
                            summaryTab.Cells[11, 0] = new Cell("Expedite: " + projInfo.expedite);
                            summaryTab.Cells[12, 0] = new Cell("Preapproved: " + projInfo.preapproved);
                            summaryTab.Cells[13, 0] = new Cell("Conference Call: " + projInfo.conference_call);
                            summaryTab.Cells[14, 0] = new Cell("Linked: " + projInfo.linked);
                            summaryTab.Cells[15, 0] = new Cell("Link Type: " + projInfo.link_type);
                            summaryTab.Cells[16, 0] = new Cell("Linked Projects: " + projInfo.linked_projects);
                            summaryTab.Cells[17, 0] = new Cell("Description: " + projInfo.description);
                            summaryTab.Cells[18, 0] = new Cell("Project Notes: " + projInfo.project_notes);
                            summaryTab.Cells[19, 0] = new Cell("Requested UAT Date: " + projInfo.requested_uat_date);
                            summaryTab.Cells[20, 0] = new Cell("Requested PROD Date: " + projInfo.requested_prod_date);
                            summaryTab.Cells[21, 0] = new Cell("Project Dependencies: " + projInfo.project_dependencies);

                            summaryTab.Cells[23, 0] = new Cell("Project Contacts Data");

                            summaryTab.Cells[25, 0] = new Cell("USAN TC: " + getAllContacts(db, filter, "USAN TC"));
                            summaryTab.Cells[26, 0] = new Cell("USAN DEV PM: " + getAllContacts(db, filter, "USAN Dev PM"));
                            summaryTab.Cells[27, 0] = new Cell("USAN BA: " + getAllContacts(db, filter, "USAN BA"));
                            summaryTab.Cells[28, 0] = new Cell("USAN Developer: " + getAllContacts(db, filter, "USAN Developer"));
                            summaryTab.Cells[29, 0] = new Cell("USAN MIS: " + getAllContacts(db, filter, "USAN MIS"));
                            summaryTab.Cells[30, 0] = new Cell("USAN QA: " + getAllContacts(db, filter, "USAN QA"));
                            summaryTab.Cells[31, 0] = new Cell("USAN OPS PM: " + getAllContacts(db, filter, "USAN Ops PM"));
                            summaryTab.Cells[32, 0] = new Cell("USAN TLS-IP: " + getAllContacts(db, filter, "USAN TLS-IP"));
                            summaryTab.Cells[33, 0] = new Cell("USAN TLS-SaaS: " + getAllContacts(db, filter, "USAN TLS-SaaS"));
                            summaryTab.Cells[34, 0] = new Cell("USAN Systems Engineer: " + getAllContacts(db, filter, "USAN Systems Engineer"));

                            summaryTab.Cells[36, 0] = new Cell("Customer RFQ: " + getAllContacts(db, filter, "Customer RFQ"));
                            summaryTab.Cells[37, 0] = new Cell("Customer PM: " + getAllContacts(db, filter, "Customer PM"));
                            summaryTab.Cells[38, 0] = new Cell("Customer Testing: " + getAllContacts(db, filter, "Customer Testing"));
                            summaryTab.Cells[39, 0] = new Cell("Customer Host: " + getAllContacts(db, filter, "Customer Host"));
                            summaryTab.Cells[40, 0] = new Cell("Customer TC: " + getAllContacts(db, filter, "Customer TC"));

                            summaryTab.Cells[42, 0] = new Cell("Project Requirements");

                            summaryTab.Cells[44, 0] = new Cell("Documentation Visio: " + getCheckboxValues(db, filter, projInfo.doc_visio));
                            summaryTab.Cells[45, 0] = new Cell("Documentation VUI: " + getCheckboxValues(db, filter, projInfo.doc_vui));
                            summaryTab.Cells[46, 0] = new Cell("Documentation Other: " + getCheckboxValues(db, filter, projInfo.doc_other));
                            summaryTab.Cells[47, 0] = new Cell("Application: " + getCheckboxValues(db, filter, projInfo.application));
                            summaryTab.Cells[48, 0] = new Cell("Parm: " + getCheckboxValues(db, filter, projInfo.parm));
                            summaryTab.Cells[49, 0] = new Cell("Reporting Button: " + getCheckboxValues(db, filter, projInfo.reporting_button));
                            summaryTab.Cells[50, 0] = new Cell("Reporting Other: " + getCheckboxValues(db, filter, projInfo.reporting_other));
                            summaryTab.Cells[51, 0] = new Cell("Reporting Vision: " + getCheckboxValues(db, filter, projInfo.reporting_vision));
                            summaryTab.Cells[52, 0] = new Cell("Tables .xls/.csv: " + getCheckboxValues(db, filter, projInfo.tables_xls_csv));
                            summaryTab.Cells[53, 0] = new Cell("Tables Metafile: " + getCheckboxValues(db, filter, projInfo.tables_metafile));
                            summaryTab.Cells[54, 0] = new Cell("Tables Def File: " + getCheckboxValues(db, filter, projInfo.tables_def_file));
                            summaryTab.Cells[55, 0] = new Cell("Tables USAN Update / USAN Load: " + getCheckboxValues(db, filter, projInfo.tables_usan_update_load));
                            summaryTab.Cells[56, 0] = new Cell("Tables Customer Update / USAN Load: " + getCheckboxValues(db, filter, projInfo.tables_customer_update_usan_load));
                            summaryTab.Cells[57, 0] = new Cell("Tables Customer Update / Customer Load: " + getCheckboxValues(db, filter, projInfo.tables_customer_update_load));
                            summaryTab.Cells[58, 0] = new Cell("Prompts Standard: " + getCheckboxValues(db, filter, projInfo.prompts_standard));
                            summaryTab.Cells[59, 0] = new Cell("Prompts NLU: " + getCheckboxValues(db, filter, projInfo.prompts_nlu));
                            summaryTab.Cells[60, 0] = new Cell("Routing New 800#s: " + getCheckboxValues(db, filter, projInfo.routing_new_800_nums));
                            summaryTab.Cells[61, 0] = new Cell("Routing Remove 800#s: " + getCheckboxValues(db, filter, projInfo.routing_remove_800_nums));
                            summaryTab.Cells[62, 0] = new Cell("Routing Redirect 800#s: " + getCheckboxValues(db, filter, projInfo.routing_redirect_800_nums));
                            summaryTab.Cells[63, 0] = new Cell("Routing DAPSS7: " + getCheckboxValues(db, filter, projInfo.routing_dap_ss7));
                            summaryTab.Cells[64, 0] = new Cell("Traffic: " + getCheckboxValues(db, filter, projInfo.traffic));
                            summaryTab.Cells[65, 0] = new Cell("Scraper: " + getCheckboxValues(db, filter, projInfo.scraper));
                            summaryTab.Cells[66, 0] = new Cell("New Tran Type: " + getCheckboxValues(db, filter, projInfo.new_tran_type));
                            summaryTab.Cells[67, 0] = new Cell("Engine: " + getCheckboxValues(db, filter, projInfo.engine));
                            summaryTab.Cells[68, 0] = new Cell("Grammars Standard: " + getCheckboxValues(db, filter, projInfo.grammars_standard));
                            summaryTab.Cells[69, 0] = new Cell("Grammars VXML: " + getCheckboxValues(db, filter, projInfo.grammars_vxml));
                            summaryTab.Cells[70, 0] = new Cell("BackOffice DB: " + getCheckboxValues(db, filter, projInfo.backoffice_db));
                            summaryTab.Cells[71, 0] = new Cell("BackOffice Process: " + getCheckboxValues(db, filter, projInfo.backoffice_process));
                            summaryTab.Cells[72, 0] = new Cell("BackOffice Web Services: " + getCheckboxValues(db, filter, projInfo.backoffice_webservices));
                            summaryTab.Cells[73, 0] = new Cell("Network File Transfer: " + getCheckboxValues(db, filter, projInfo.network_file_transfer));
                            summaryTab.Cells[74, 0] = new Cell("Network Infrastructure: " + getCheckboxValues(db, filter, projInfo.network_infrastructure));
                            summaryTab.Cells[75, 0] = new Cell("Host Connectivity: " + getCheckboxValues(db, filter, projInfo.host_connectivity));
                            summaryTab.Cells[76, 0] = new Cell("Host WSDL: " + getCheckboxValues(db, filter, projInfo.host_wsdl));
                            summaryTab.Cells[77, 0] = new Cell("TNT Functionality: " + getCheckboxValues(db, filter, projInfo.tnt));
                            summaryTab.Cells[78, 0] = new Cell("TTS Functionality: " + getCheckboxValues(db, filter, projInfo.tts));
                            summaryTab.Cells[79, 0] = new Cell("Speech Recognition: " + getCheckboxValues(db, filter, projInfo.speech_rec));
                            summaryTab.Cells[80, 0] = new Cell("UUI: " + getCheckboxValues(db, filter, projInfo.uui));
                            summaryTab.Cells[81, 0] = new Cell("Readi800: " + getCheckboxValues(db, filter, projInfo.readi800));
                            summaryTab.Cells[82, 0] = new Cell("AccesasUSAN Access/User: " + getCheckboxValues(db, filter, projInfo.access_usan_user_access));
                            summaryTab.Cells[83, 0] = new Cell("Nuance Development: " + getCheckboxValues(db, filter, projInfo.nuance_development));
                            summaryTab.Cells[84, 0] = new Cell("Nuance NDM: " + getCheckboxValues(db, filter, projInfo.nuance_ndm));
                            summaryTab.Cells[85, 0] = new Cell("Service ID: " + getCheckboxValues(db, filter, projInfo.service_id));
                            summaryTab.Cells[86, 0] = new Cell("Biso Approval: " + getCheckboxValues(db, filter, projInfo.biso_approval));
                            summaryTab.Cells[87, 0] = new Cell("Other: " + getCheckboxValues(db, filter, projInfo.other));

                            summaryTab.Cells[89, 0] = new Cell("Project Status and History");

                            string building = "";
                            if (db.ProjectStatus.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                            {
                                var statusList = db.ProjectStatus.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                                for (int i = 0; i < statusList.Count(); i++)
                                {
                                    building += statusList[i].StatusType.type + " - " + statusList[i].date;
                                    if (i + 1 < statusList.Count())
                                    {
                                        building += "| ";
                                    }
                                }
                            }

                            string[] gridResultsSeparated = building.Split('|');
                            int cellCounter1 = 0;
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 91 + x;
                                summaryTab.Cells[currentCell, 0] = new Cell("Project History Entry " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            summaryTab.Cells[cellCounter1, 0] = new Cell("Project Folder: " + projInfo.project_folder);


                            summaryTab.Cells.ColumnWidth[0] = 10000;
                            summaryTab.Cells.ColumnWidth[1] = 10000;
                            workbook.Worksheets.Add(summaryTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Summary Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }
                        //REQUIREMENTS TAB
                        try
                        {
                            Worksheet requirementsTab = new Worksheet("Requirements Tab");


                            requirementsTab.Cells[0, 0] = new Cell("Requirements Tab Data");

                            int cellCounter1 = 0,
                                cellCounter2 = 0;

                            string totalGridResults = getRequirementsInfo(db, filter, "Doc");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Documentation Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "App");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Application Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Table");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Table Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Scraper");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Scraper Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }


                            totalGridResults = getRequirementsInfo(db, filter, "Engine");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Engine Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Manager");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Manager Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Grammar");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Grammar Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "VXML");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("VXML Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "DB");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("BackOffice DB Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Process");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("BackOffice Process Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Webservice");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("BackOffice Web Service Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Config");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Configuration File Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Fax");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Fax Form Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Xfer");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("File Xfer Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "TTS");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("TTS Functionality Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "TNT");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("TNT Functionality Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Speech");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Speech Recognition Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "UUI");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("UUI Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Service");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Service ID Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = getRequirementsInfo(db, filter, "Other");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                requirementsTab.Cells[currentCell, 0] = new Cell("Other Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            requirementsTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(requirementsTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Requirements Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }
                        //MIS Updates TAB
                        try
                        {
                            Worksheet misupdatesTab = new Worksheet("MIS Updates Tab");


                            misupdatesTab.Cells[0, 0] = new Cell("MIS Updates Tab Data");

                            misupdatesTab.Cells[2, 0] = new Cell("Report Change");

                            misupdatesTab.Cells[4, 0] = new Cell("Report Name(s): " + grabMISUpdateReportNames(db, filter));
                            misupdatesTab.Cells[5, 0] = new Cell("Description of Change: " + grabMISUpdateReportDescription(db, filter));

                            misupdatesTab.Cells[7, 0] = new Cell("Distribution Change");

                            misupdatesTab.Cells[9, 0] = new Cell("Emails To Add: " + grabMISUpdateEmails(db, filter, "add"));
                            misupdatesTab.Cells[10, 0] = new Cell("Emails To Delete: " + grabMISUpdateEmails(db, filter, "delete"));

                            misupdatesTab.Cells[12, 0] = new Cell("Delivery Change");

                            misupdatesTab.Cells[14, 0] = new Cell("New Method: " + grabMISUpdateDelivery(db, filter, "method"));
                            misupdatesTab.Cells[15, 0] = new Cell("New Format: " + grabMISUpdateDelivery(db, filter, "format"));
                            misupdatesTab.Cells[16, 0] = new Cell("New Frequency: " + grabMISUpdateDelivery(db, filter, "frequency"));

                            misupdatesTab.Cells[18, 0] = new Cell("MIS Updates Grid Data");


                            string totalGridResults = grabMISUpdateDNIS(db, filter, "add");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            int cellCounter1 = 0;
                            int cellCounter2 = 0;

                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 20 + x;
                                misupdatesTab.Cells[currentCell, 0] = new Cell("Add DNIS " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 1;
                            }

                            cellCounter1++;

                            totalGridResults = grabMISUpdateDNIS(db, filter, "change");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                misupdatesTab.Cells[currentCell, 0] = new Cell("Change DNIS " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 1;
                            }

                            cellCounter2++;

                            totalGridResults = grabMISUpdateDNIS(db, filter, "delete");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                misupdatesTab.Cells[currentCell, 0] = new Cell("Delete DNIS " + (x + 1) + ": " + gridResultsSeparated[x]);
                            }


                            misupdatesTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(misupdatesTab);

                        }
                        catch (Exception e)
                        {
                            comments += ("Error - MIS Updates Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }

                        //MIS New TAB
                        try
                        {
                            Worksheet misnewTab = new Worksheet("MIS New Tab");


                            misnewTab.Cells[0, 0] = new Cell("MIS New Tab Data");

                            misnewTab.Cells[2, 0] = new Cell("New Report Description: " + grabMISNewReportDescription(db, filter));

                            misnewTab.Cells[4, 0] = new Cell("File1 Reporting Info");

                            misnewTab.Cells[6, 0] = new Cell("Business Unit/Division: " + grabMISNewBUDivision(db, filter));
                            misnewTab.Cells[7, 0] = new Cell("Product/Application: " + grabMISNewApplication(db, filter));
                            misnewTab.Cells[8, 0] = new Cell("Requested Report Names: " + grabMISNewReportNames(db, filter));

                            misnewTab.Cells[10, 0] = new Cell("Delivery Change");

                            misnewTab.Cells[12, 0] = new Cell("Method: " + grabMISNewDelivery(db, filter, "method"));
                            misnewTab.Cells[13, 0] = new Cell("Format: " + grabMISNewDelivery(db, filter, "format"));
                            misnewTab.Cells[14, 0] = new Cell("Frequency: " + grabMISNewDelivery(db, filter, "frequency"));

                            misnewTab.Cells[16, 0] = new Cell("Distribution Change");

                            misnewTab.Cells[18, 0] = new Cell("Emails to Add: " + grabMISNewDistribution(db, filter, "add"));
                            misnewTab.Cells[19, 0] = new Cell("Emails to Delete: " + grabMISNewDistribution(db, filter, "delete"));

                            misnewTab.Cells[21, 0] = new Cell("MIS New Grid Data");

                            string totalGridResults = grabMISNewDNIS(db, filter);
                            string[] gridResultsSeparated = totalGridResults.Split('|');

                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 23 + x;
                                misnewTab.Cells[currentCell, 0] = new Cell("Add DNIS " + (x + 1) + ": " + gridResultsSeparated[x]);
                            }

                            //misnewTab.Cells[23, 0] = new Cell("Add DNIS: " + grabMISNewDNIS(db, filter));

                            misnewTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(misnewTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - MIS New Module " + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }

                        //Traffic & Routing Tab
                        try
                        {
                            Worksheet trafficroutingTab = new Worksheet("Traffic & Routing Tab");

                            trafficroutingTab.Cells[0, 0] = new Cell("Traffic & Routing Tab Data");

                            trafficroutingTab.Cells[2, 0] = new Cell("New Traffic");

                            trafficroutingTab.Cells[4, 0] = new Cell("Included in Forecast: " + grabTrafficRoutingData(db, filter, "forecast"));
                            trafficroutingTab.Cells[5, 0] = new Cell("Incremental Min./Mo.: " + grabTrafficRoutingData(db, filter, "minmo"));
                            trafficroutingTab.Cells[6, 0] = new Cell("Incremental Calls/Mo.: " + grabTrafficRoutingData(db, filter, "callsmo"));
                            trafficroutingTab.Cells[7, 0] = new Cell("Busy-Hour Calls: " + grabTrafficRoutingData(db, filter, "busycalls"));
                            trafficroutingTab.Cells[8, 0] = new Cell("Busy-Hour Call %: " + grabTrafficRoutingData(db, filter, "busypercentage"));
                            trafficroutingTab.Cells[9, 0] = new Cell("Average Call Duration: " + grabTrafficRoutingData(db, filter, "average"));

                            trafficroutingTab.Cells[11, 0] = new Cell("Routing Requirements Grids");

                            string totalGridResults = grabTrafficRoutingDNIS(db, filter, "add");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            int cellCounter1 = 0;
                            int cellCounter2 = 0;

                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 13 + x;
                                trafficroutingTab.Cells[currentCell, 0] = new Cell("Add DNIS " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 1;
                            }

                            cellCounter1++;

                            totalGridResults = grabTrafficRoutingDNIS(db, filter, "change");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                trafficroutingTab.Cells[currentCell, 0] = new Cell("Change DNIS " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 1;
                            }

                            cellCounter2++;

                            totalGridResults = grabTrafficRoutingDNIS(db, filter, "delete");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                trafficroutingTab.Cells[currentCell, 0] = new Cell("Delete DNIS " + (x + 1) + ": " + gridResultsSeparated[x]);
                            }

                            trafficroutingTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(trafficroutingTab);

                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Traffic Routing Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }
                        //SWD Tab
                        try
                        {
                            Worksheet swdTab = new Worksheet("SWD Tab");

                            swdTab.Cells[0, 0] = new Cell("SWD Tab Data");

                            swdTab.Cells[2, 0] = new Cell("SWD Assessment");

                            int cellCounter1 = 0,
                                cellCounter2 = 0;

                            string totalGridResults = grabSWDAssessments(db, filter, "ba");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 4 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("BA / TC Design / Documentation " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "workflow");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("Workflow " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "requirements");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("Requirements Clarification - Post Auth " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "coding");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("Coding " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "mis");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("MIS CF Labels " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "testing");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("Testing/Implementation " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "misother");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("MIS Other " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "qa");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("QA " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "uat");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("UAT Support " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "overhead");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                swdTab.Cells[currentCell, 0] = new Cell("Project Overhead " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 1;
                            }

                            swdTab.Cells[cellCounter2 + 2, 0] = new Cell("SWD Schedule Summary");

                            swdTab.Cells[cellCounter2 + 4, 0] = new Cell("Total Billable PM Hours: " + grabSWDSchedule(db, filter, "pmhours"));

                            swdTab.Cells[cellCounter2 + 6, 0] = new Cell("Scheduled Vendor Start: " + grabSWDSchedule(db, filter, "svs"));
                            swdTab.Cells[cellCounter2 + 7, 0] = new Cell("Scheduled Vendor Complete: " + grabSWDSchedule(db, filter, "svc"));
                            swdTab.Cells[cellCounter2 + 8, 0] = new Cell("Actual Vendor Complete: " + grabSWDSchedule(db, filter, "avc"));

                            swdTab.Cells[cellCounter2 + 10, 0] = new Cell("Scheduled BA Start: " + grabSWDSchedule(db, filter, "sbs"));
                            swdTab.Cells[cellCounter2 + 11, 0] = new Cell("Scheduled BA Complete: " + grabSWDSchedule(db, filter, "sbc"));
                            swdTab.Cells[cellCounter2 + 12, 0] = new Cell("Actual BA Complete: " + grabSWDSchedule(db, filter, "abc"));

                            swdTab.Cells[cellCounter2 + 14, 0] = new Cell("Scheduled CF Docs to Cusomter: " + grabSWDSchedule(db, filter, "scfdc"));
                            swdTab.Cells[cellCounter2 + 15, 0] = new Cell("Scheduled CF Docs Approval: " + grabSWDSchedule(db, filter, "scfda"));
                            swdTab.Cells[cellCounter2 + 16, 0] = new Cell("Actual CF Docs to Customer: " + grabSWDSchedule(db, filter, "acfdc"));
                            swdTab.Cells[cellCounter2 + 17, 0] = new Cell("Actual CF Docs Approval: " + grabSWDSchedule(db, filter, "acfda"));

                            swdTab.Cells[cellCounter2 + 19, 0] = new Cell("Target Scripts Ordered: " + grabSWDSchedule(db, filter, "tso"));
                            swdTab.Cells[cellCounter2 + 20, 0] = new Cell("Target Scripts Delivered: " + grabSWDSchedule(db, filter, "tsd"));
                            swdTab.Cells[cellCounter2 + 21, 0] = new Cell("Actual Scripts Loaded: " + grabSWDSchedule(db, filter, "asl"));

                            swdTab.Cells[cellCounter2 + 23, 0] = new Cell("Actual Dev Complete: " + grabSWDSchedule(db, filter, "adc"));

                            swdTab.Cells[cellCounter2 + 25, 0] = new Cell("Actual QA Complete: " + grabSWDSchedule(db, filter, "aqc"));

                            swdTab.Cells[cellCounter2 + 27, 0] = new Cell("Scheduled TLS_SaaS Start: " + grabSWDSchedule(db, filter, "sts"));
                            swdTab.Cells[cellCounter2 + 28, 0] = new Cell("Scheduled TLS_SaaS Complete: " + grabSWDSchedule(db, filter, "stc"));
                            swdTab.Cells[cellCounter2 + 29, 0] = new Cell("Actual TLS_SaaS Complete: " + grabSWDSchedule(db, filter, "atc"));

                            swdTab.Cells[cellCounter2 + 31, 0] = new Cell("Scheduled Systems Start: " + grabSWDSchedule(db, filter, "sss"));
                            swdTab.Cells[cellCounter2 + 32, 0] = new Cell("Scheduled Systems Complete: " + grabSWDSchedule(db, filter, "ssc"));
                            swdTab.Cells[cellCounter2 + 33, 0] = new Cell("Actual Systems Complete: " + grabSWDSchedule(db, filter, "asc"));

                            swdTab.Cells[cellCounter2 + 35, 0] = new Cell("Scheduled UAT Delivery: " + grabSWDSchedule(db, filter, "sud"));
                            swdTab.Cells[cellCounter2 + 36, 0] = new Cell("Actual UAT Delivery: " + grabSWDSchedule(db, filter, "aud"));

                            swdTab.Cells[cellCounter2 + 38, 0] = new Cell("SWD Comments: " + grabSWDSchedule(db, filter, "comments"));

                            swdTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(swdTab);

                        }
                        catch (Exception e)
                        {
                            comments += ("Error - SWD Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }
                        //TLS Tab
                        try
                        {
                            Worksheet tlsTab = new Worksheet("TLS Tab");

                            tlsTab.Cells[0, 0] = new Cell("TLS Tab Data");

                            tlsTab.Cells[2, 0] = new Cell("TLS_IP Assessment");


                            int cellCounter1 = 0,
                                cellCounter2 = 0;

                            string totalGridResults = grabSWDAssessments(db, filter, "accessIP");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 4 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Access USAN SetUp " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            /*
                            totalGridResults = grabSWDAssessments(db, filter, "scriptsIP");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Scripts " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }
                            */

                            totalGridResults = grabSWDAssessments(db, filter, "uatImpIP");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("UAT Implementation " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "uatSupIP");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("UAT Support " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "prodIP");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Production Implementation " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "otherIP");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Other " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            cellCounter2++;
                            tlsTab.Cells[cellCounter2, 0] = new Cell("TLS_SaaS Assessment");
                            cellCounter2 += 2;

                            totalGridResults = grabSWDAssessments(db, filter, "codingSaaS");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Coding " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "testingSaaS");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Testing " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "uatImpSaaS");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("UAT Implementation " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "uatSupSaaS");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("UAT Support " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "prodSaaS");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter2 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Production Implementation " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "otherSaaS");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                tlsTab.Cells[currentCell, 0] = new Cell("Other " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }


                            tlsTab.Cells[cellCounter2 + 1, 0] = new Cell("TLS Comments: " + grabSWDSchedule(db, filter, "commentsTLS"));

                            tlsTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(tlsTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - TLS Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }
                        //Systems Tab

                        try
                        {
                            Worksheet systemsTab = new Worksheet("Systems Tab");

                            systemsTab.Cells[0, 0] = new Cell("Systems Tab Data");

                            systemsTab.Cells[2, 0] = new Cell("Systems Assessment");

                            int cellCounter1 = 0,
                                cellCounter2 = 0;

                            string totalGridResults = grabSWDAssessments(db, filter, "systems");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 4 + x;
                                systemsTab.Cells[currentCell, 0] = new Cell("Systems Engineering " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            totalGridResults = grabSWDAssessments(db, filter, "hardware");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                systemsTab.Cells[currentCell, 0] = new Cell("Hardware Requirements " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            systemsTab.Cells[cellCounter2 + 1, 0] = new Cell("Systems Comments: " + grabSWDSchedule(db, filter, "commentsSystems"));

                            systemsTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(systemsTab);

                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Systems Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }
                        //UAT & Prod Install Tab
                        try
                        {
                            Worksheet uatProdInstallTab = new Worksheet("UAT & Prod Install Tab");

                            uatProdInstallTab.Cells[0, 0] = new Cell("UAT & Prod Install Tab Data");

                            uatProdInstallTab.Cells[2, 0] = new Cell("Maintenance Type: " + grabUATProdInstallData(db, filter, "maint"));

                            uatProdInstallTab.Cells[4, 0] = new Cell("Panel 1: Panel Name: Production Panel: " + grabUATProdInstallData(db, filter, "prod"));
                            uatProdInstallTab.Cells[5, 0] = new Cell("Panel 2: " + grabUATProdInstallData(db, filter, "panel2"));
                            uatProdInstallTab.Cells[6, 0] = new Cell("Panel 3: " + grabUATProdInstallData(db, filter, "panel3"));
                            uatProdInstallTab.Cells[7, 0] = new Cell("Panel 4: " + grabUATProdInstallData(db, filter, "panel4"));
                            uatProdInstallTab.Cells[8, 0] = new Cell("Panel 5: " + grabUATProdInstallData(db, filter, "panel5"));

                            uatProdInstallTab.Cells[10, 0] = new Cell("Post-Install Notification: " + grabUATProdInstallData(db, filter, "postInstall"));

                            int cellCounter1 = 0;

                            string totalGridResults = grabUATProdInstallData(db, filter, "req");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 12 + x;
                                uatProdInstallTab.Cells[currentCell, 0] = new Cell("UAT Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            uatProdInstallTab.Cells[cellCounter1, 0] = new Cell("Staging Folders: " + grabUATProdInstallData(db, filter, "stage"));

                            uatProdInstallTab.Cells[cellCounter1 + 2, 0] = new Cell("Comments: " + grabUATProdInstallData(db, filter, "comments"));

                            uatProdInstallTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(uatProdInstallTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - UAT Prod Install Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }

                        //Buffet Prod Install Tab
                        try
                        {
                            Worksheet buffetProdInstallTab = new Worksheet("Buffet Prod Install Tab");

                            buffetProdInstallTab.Cells[0, 0] = new Cell("Buffet Prod Install Tab Data");

                            buffetProdInstallTab.Cells[2, 0] = new Cell("Buffet Prod Install Details");

                            buffetProdInstallTab.Cells[4, 0] = new Cell("Date: " + grabBuffetProdInstallData(db, filter, "date"));
                            buffetProdInstallTab.Cells[5, 0] = new Cell("Conference Start: " + grabBuffetProdInstallData(db, filter, "start"));
                            buffetProdInstallTab.Cells[6, 0] = new Cell("Conference Bridge / PC: " + grabBuffetProdInstallData(db, filter, "bridge"));
                            buffetProdInstallTab.Cells[7, 0] = new Cell("Nodes: " + grabBuffetProdInstallData(db, filter, "nodes"));
                            buffetProdInstallTab.Cells[8, 0] = new Cell("Post-Maintenance Notification: " + grabBuffetProdInstallData(db, filter, "post"));

                            int cellCounter1 = 0;

                            string totalGridResults = grabBuffetProdInstallData(db, filter, "buffet");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 10 + x;
                                buffetProdInstallTab.Cells[currentCell, 0] = new Cell("Buffet Requirement " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            buffetProdInstallTab.Cells[cellCounter1, 0] = new Cell("Comments: " + grabBuffetProdInstallData(db, filter, "comments"));

                            buffetProdInstallTab.Cells[cellCounter1 + 2, 0] = new Cell("Staging Folders: " + grabBuffetProdInstallData(db, filter, "stage"));

                            buffetProdInstallTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(buffetProdInstallTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Buffet Prod Install Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }


                        //Prompts Tab
                        try
                        {
                            Worksheet promptsTab = new Worksheet("Prompts Tab");

                            promptsTab.Cells[0, 0] = new Cell("Prompts Tab Data");

                            promptsTab.Cells[2, 0] = new Cell("Prompts Summary: " + grabPromptsData(db, filter, "summary"));

                            int cellCounter1 = 0,
                                cellCounter2 = 0;

                            string totalGridResults = grabPromptsData(db, filter, "greatvoice");
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 4 + x;
                                promptsTab.Cells[currentCell, 0] = new Cell("GreatVoice Prompt Entry " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter1 = currentCell + 2;
                            }

                            promptsTab.Cells[cellCounter1, 0] = new Cell("GreatVoice Common Data: " + grabPromptsData(db, filter, "greatvoiceCommon"));

                            cellCounter1 += 2;
                            totalGridResults = grabPromptsData(db, filter, "gmvoice");
                            gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = cellCounter1 + x;
                                promptsTab.Cells[currentCell, 0] = new Cell("GMVoice Prompt Entry " + (x + 1) + ": " + gridResultsSeparated[x]);
                                cellCounter2 = currentCell + 2;
                            }

                            promptsTab.Cells[cellCounter2, 0] = new Cell("GM Voice Common Data: " + grabPromptsData(db, filter, "gmvoiceCommon"));

                            promptsTab.Cells[cellCounter2 + 2, 0] = new Cell("PO#: " + grabPromptsData(db, filter, "po"));
                            promptsTab.Cells[cellCounter2 + 3, 0] = new Cell("Prompt Folder: " + grabPromptsData(db, filter, "promptfolder"));

                            promptsTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(promptsTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Prompts Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }

                        //Assumptions Tab
                        try
                        {
                            Worksheet assumptionsTab = new Worksheet("Assumptions Tab");

                            assumptionsTab.Cells[0, 0] = new Cell("Assumptions Tab Data");

                            string totalGridResults = grabAssumptions(db, filter);
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 2 + x;
                                assumptionsTab.Cells[currentCell, 0] = new Cell("Project Assumption " + (x + 1) + ": " + gridResultsSeparated[x]);
                            }

                            assumptionsTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(assumptionsTab);

                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Assumptions Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }

                        //Deliverables Tab
                        try
                        {
                            Worksheet deliverablesTab = new Worksheet("Deliverables Tab");

                            deliverablesTab.Cells[0, 0] = new Cell("Deliverables Tab Data");

                            string totalGridResults = grabDeliverables(db, filter);
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 2 + x;
                                deliverablesTab.Cells[currentCell, 0] = new Cell("Project Deliverable " + (x + 1) + ": " + gridResultsSeparated[x]);
                            }

                            deliverablesTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(deliverablesTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Deliverables Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }

                        //ChangeLog Tab
                        try
                        {
                            Worksheet changeLogTab = new Worksheet("Change Log Tab");

                            changeLogTab.Cells[0, 0] = new Cell("Change Log Tab Data");

                            string totalGridResults = grabChangeLog(db, filter);
                            string[] gridResultsSeparated = totalGridResults.Split('|');
                            for (int x = 0; x < gridResultsSeparated.Length; x++)
                            {
                                int currentCell = 2 + x;
                                changeLogTab.Cells[currentCell, 0] = new Cell("Change Log Entry " + (x + 1) + ": " + gridResultsSeparated[x]);
                            }

                            changeLogTab.Cells.ColumnWidth[0] = 10000;
                            workbook.Worksheets.Add(changeLogTab);
                        }
                        catch (Exception e)
                        {
                            comments += ("Error - Deliverables Module|" + e.Source + e.TargetSite + e.Data + e.InnerException + e.Message + e.StackTrace + e.HelpLink);
                        }

                        try
                        {
                            workbook.Save(file);
                            if (comments.Contains("Error") || comments.Contains("error"))
                            {
                                return new PagedData("Error - Partial Project Exported to " + folder + " with the filename: " + filename + ". " + comments);
                            }
                            return new PagedData("Success - Project Exported to " + folder + " with the filename: " + filename);
                        }
                        catch (Exception e)
                        {
                            return new PagedData("Project Unable To Be Exported Contact Cookbook Admin - Error: " + e.Message, false);
                        }
                    }
                }
                else
                {
                    return new PagedData("ExportCurrentProject expects a project_id"); 
                }   
            }

        }



        public String grabChangeLog(CookDBDataContext db, string filter)
        {
            string building = "";
            if (db.ChangeLogs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
            {
                var buildingList = db.ChangeLogs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                for (int i = 0; i < buildingList.Count(); i++)
                {
                    building += "User: " + buildingList[i].user_name + "; ";
                    building += "Date: " + buildingList[i].date + "; ";
                    building += "Time: " + buildingList[i].time + "; ";
                    building += "Tab: " + buildingList[i].tab + "; ";
                    building += "Description: " + buildingList[i].description;
                    if (i + 1 < buildingList.Count())
                    {
                        building += " | ";
                    }
                }
            }
            return building;
        }

        public String grabDeliverables(CookDBDataContext db, string filter)
        {
            string building = "";
            if (db.ProjectDeliverables.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
            {
                var buildingList = db.ProjectDeliverables.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                for (int i = 0; i < buildingList.Count(); i++)
                {
                    building += "Deliverable: " + buildingList[i].deliverable_text;
                    if (i + 1 < buildingList.Count())
                    {
                        building += " | ";
                    }
                }
            }
            return building;
        }

        public String grabAssumptions(CookDBDataContext db, string filter)
        {
            string building = "";
            if (db.ProjectAssumptions.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
            {
                var buildingList = db.ProjectAssumptions.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                for (int i = 0; i < buildingList.Count(); i++)
                {
                    building += "Assumption: " + buildingList[i].assumption_text + "; Category: " + buildingList[i].category;
                    if (i + 1 < buildingList.Count())
                    {
                        building += " | ";
                    }
                }
            }
            return building;
        }

        public String grabPromptsData(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "po":
                    {
                        if (db.PromptWorksheets.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.PromptWorksheets.First(a => a.project_id.Equals(int.Parse(filter))).po_num;
                        }
                        return building;
                    }
                case "promptfolder":
                    {
                        if (db.PromptWorksheets.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.PromptWorksheets.First(a => a.project_id.Equals(int.Parse(filter))).prompt_worksheet;
                        }
                        return building;
                    }
                case "gmvoice":
                    {
                        if (db.GMVoicePromptDetails.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.GMVoicePromptDetails.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Language: " + buildingList[i].language + "; ";
                                building += "Prompts To Be Recorded: " + buildingList[i].prompts_recorded + "; ";
                                building += "Prompts To Be Billed: " + buildingList[i].prompts_billed + "; ";
                                building += "Prompts Provided by Customer: " + buildingList[i].prompts_provided + "; ";
                                building += "Translation Required - Min Fee: " + buildingList[i].min_fee + "; ";
                                building += "Translation Required - # of Words: " + buildingList[i].num_words + "; ";
                                building += "Order Type: " + buildingList[i].order_type + "; ";
                                building += "Recording Sessions: " + buildingList[i].recording_sessions + "; ";
                                building += "Voice Talent: " + buildingList[i].recording_studio + "; ";
                                building += "Prompts to be Converted: " + buildingList[i].prompts_converted + "; ";
                                building += "Conversion Sessions: " + buildingList[i].conversion_sessions + "; ";
                                building += "Prompts to be Digitized: " + buildingList[i].prompts_digitized + "; ";
                                building += "Prompt Transfer Fee Required: " + buildingList[i].fee_required + "; ";
                                building += "CD Required: " + buildingList[i].cd_required + "; ";
                                building += "CD Mailing Address: " + buildingList[i].cd_mailing_address + "; ";
                                building += "Prompt Format: " + buildingList[i].prompt_format + "; ";
                                building += "Converted Prompt Format: " + buildingList[i].converted_prompt_format + "; ";
                                building += "Translation Needs Approval: " + buildingList[i].needs_approval + "; ";
                                building += "Setup Fee: " + buildingList[i].setup_fee + "; ";
                                building += "Recording 1-2: " + buildingList[i].recording1_fee + "; ";
                                building += "Recording 3+: " + buildingList[i].recording3_fee + "; ";
                                building += "Translation: " + buildingList[i].translation_fee + "; ";
                                building += "Delivery: " + buildingList[i].delivery_fee + "; ";
                                building += "Totals: " + buildingList[i].total_recording_fee;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "gmvoiceCommon":
                    {
                        if (db.PromptWorksheets.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = "Project Total: " + db.PromptWorksheets.First(a => a.project_id.Equals(int.Parse(filter))).gm_voices_total_fee;
                        }
                        return building;
                    }
                case "greatvoiceCommon":
                    {
                        if (db.PromptWorksheets.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = "CD Fee: " + db.PromptWorksheets.First(a => a.project_id.Equals(int.Parse(filter))).great_voice_cd_fee + "; ";
                            building += "Total Recording Fee: " + db.PromptWorksheets.First(a => a.project_id.Equals(int.Parse(filter))).great_voice_total_fee;
                        }
                        return building;
                    }
                case "greatvoice":
                    {
                        if (db.PromptDetails.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.PromptDetails.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Language: " + buildingList[i].language + "; ";
                                building += "Prompts To Be Recorded: " + buildingList[i].prompts_recorded + "; ";
                                building += "Prompts To Be Billed: " + buildingList[i].prompts_billed+ "; ";
                                building += "Prompts Provided by Customer: " + buildingList[i].prompts_provided + "; ";
                                building += "Translation Required - Min Fee: " + buildingList[i].min_fee + "; ";
                                building += "Translation Required - # of Words: " + buildingList[i].num_words + "; ";
                                building += "Order Type: " + buildingList[i].order_type + "; ";
                                building += "Recording Sessions: " + buildingList[i].recording_sessions + "; ";
                                building += "Voice Talent: " + buildingList[i].recording_studio + "; ";
                                building += "Prompts to be Converted: " + buildingList[i].prompts_converted + "; ";
                                building += "Conversion Sessions: " + buildingList[i].conversion_sessions + "; ";
                                building += "Prompts to be Digitized: " + buildingList[i].prompts_digitized + "; ";
                                building += "Prompt Transfer Fee Required: " + buildingList[i].fee_required + "; ";
                                building += "CD Required: " + buildingList[i].cd_required + "; ";
                                building += "CD Mailing Address: " + buildingList[i].cd_mailing_address + "; ";
                                building += "Prompt Format: " + buildingList[i].prompt_format + "; ";
                                building += "Converted Prompt Format: " + buildingList[i].converted_prompt_format + "; ";
                                building += "Translation Needs Approval: " + buildingList[i].needs_approval + "; ";
                                building += "Fee Formula: " + buildingList[i].fee_formula + "; ";
                                building += "Setup Fee: " + buildingList[i].setup_fee + "; ";
                                building += "Prompt Fee: " + buildingList[i].prompt_fee + "; ";
                                building += "Conversion Setup Fee: " + buildingList[i].conversion_setup_fee + "; ";
                                building += "Translation Fee - Min: " + buildingList[i].fee_min + "; ";
                                building += "Translation Fee - Per Word: " + buildingList[i].fee_per_word + "; ";
                                building += "Transfer Fee: " + buildingList[i].transfer_fee;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "stage":
                    {
                        building = db.PromptWorksheets.First(a => a.project_id.Equals(int.Parse(filter))).prompt_summary;
                        return building;
                    }
                default:
                    break;
            }
            return building;
        }

        public String grabBuffetProdInstallData(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "stage":
                    {
                        if (db.StagingFolders.Count(a => a.project_id.Equals(int.Parse(filter)) && a.is_buffet.Equals(1)) > 0)
                        {
                            var buildingList = db.StagingFolders.Where(a => a.project_id.Equals(int.Parse(filter)) && a.is_buffet.Equals(1)).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Link: " + buildingList[i].folder + "; " + "Notes: " + buildingList[i].notes;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                case "comments":
                    {
                        var buildingList = db.ProdInstallationBuffets.First(a => a.project_id.Equals(int.Parse(filter)));
                        building += buildingList.comments;
                        return building;
                    }
                case "buffet":
                    {
                        if (db.BuffetProjectRequirements.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.BuffetProjectRequirements.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Associated Project: " + buildingList[i].associated_projects + "; ";
                                building += "FileName: " + buildingList[i].filename + "; ";
                                building += "Notes: " + buildingList[i].notes;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                            
                        }
                        return building;
                    }
                case "date":
                    {
                        var buildingList = db.ProdInstallationBuffets.First(a => a.project_id.Equals(int.Parse(filter)));
                        building += buildingList.date;
                        return building;
                    }
                case "start":
                    {
                        var buildingList = db.ProdInstallationBuffets.First(a => a.project_id.Equals(int.Parse(filter)));
                        building += buildingList.conference_start;
                        return building;
                    }
                case "bridge":
                    {
                        var buildingList = db.ProdInstallationBuffets.First(a => a.project_id.Equals(int.Parse(filter)));
                        building += buildingList.conference_bridge;
                        return building;
                    }
                case "nodes":
                    {
                        var buildingList = db.ProdInstallationBuffets.First(a => a.project_id.Equals(int.Parse(filter)));
                        building += buildingList.nodes;
                        return building;
                    }
                case "post":
                    {
                        var buildingList = db.ProdInstallationBuffets.First(a => a.project_id.Equals(int.Parse(filter)));
                        building += buildingList.post_maintenance_notification;
                        return building;
                    }
                default:
                    break;
            }
            return building;
        }

        public String grabUATProdInstallData(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "comments":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter)));
                            building += buildingList.comments;
                        }
                        return building;
                    }
                case "stage":
                    {
                        if (db.StagingFolders.Count(a => a.project_id.Equals(int.Parse(filter)) && a.is_buffet.Equals(0)) > 0)
                        {
                            var buildingList = db.StagingFolders.Where(a => a.project_id.Equals(int.Parse(filter)) && a.is_buffet.Equals(0)).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Link: " + buildingList[i].folder + "; " + "Notes: " + buildingList[i].notes;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                case "req":
                    {
                        if (db.ProjectRequirements.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.ProjectRequirements.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "File Name: " + buildingList[i].filename + "; " + "Additional Notes: " + buildingList[i].additional_notes;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                case "postInstall":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter)));
                            building += buildingList.post_install_notification;
                        }
                        return building;
                    }
                case "panel2":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter)));
                            building += "Panel Name: " + buildingList.column1 + "; ";
                            building += "Node: " + buildingList.prod_node + "; ";
                            building += "Date: " + buildingList.prod_date + "; ";
                            building += "USAN CCR#: " + buildingList.prod_usan_ccr + "; ";
                            building += "Customer CCR#: " + buildingList.prod_ccr + "; ";
                            building += "Maintenance Start: " + buildingList.prod_maintenance_start + "; ";
                            building += "Conference Start: " + buildingList.prod_conference_start + "; ";
                            building += "Conference Bridge / PC: " + buildingList.prod_conference_bridge;
                        }
                        return building;
                    }
                case "panel3":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter)));
                            building += "Panel Name: " + buildingList.column2 + "; ";
                            building += "Node: " + buildingList.cpz_node + "; ";
                            building += "Date: " + buildingList.cpz_date + "; ";
                            building += "USAN CCR#: " + buildingList.cpz_usan_ccr + "; ";
                            building += "Customer CCR#: " + buildingList.cpz_ccr + "; ";
                            building += "Maintenance Start: " + buildingList.cpz_maintenance_start + "; ";
                            building += "Conference Start: " + buildingList.cpz_conference_start + "; ";
                            building += "Conference Bridge / PC: " + buildingList.cpz_conference_bridge;
                        }
                        return building;
                    }
                case "panel4":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter)));
                            building += "Panel Name: " + buildingList.column3 + "; ";
                            building += "Node: " + buildingList.wor_node + "; ";
                            building += "Date: " + buildingList.wor_date + "; ";
                            building += "USAN CCR#: " + buildingList.wor_usan_ccr + "; ";
                            building += "Customer CCR#: " + buildingList.wor_ccr + "; ";
                            building += "Maintenance Start: " + buildingList.wor_maintenance_start + "; ";
                            building += "Conference Start: " + buildingList.wor_conference_start + "; ";
                            building += "Conference Bridge / PC: " + buildingList.wor_conference_bridge;
                        }
                        return building;
                    }
                case "panel5":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter)));
                            building += "Panel Name: " + buildingList.column4 + "; ";
                            building += "Node: " + buildingList.scu_node + "; ";
                            building += "Date: " + buildingList.scu_date + "; ";
                            building += "USAN CCR#: " + buildingList.scu_usan_ccr + "; ";
                            building += "Customer CCR#: " + buildingList.scu_ccr + "; ";
                            building += "Maintenance Start: " + buildingList.scu_maintenance_start + "; ";
                            building += "Conference Start: " + buildingList.scu_conference_start + "; ";
                            building += "Conference Bridge / PC: " + buildingList.scu_conference_bridge;
                        }
                        return building;
                    }
                case "prod":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter)));
                            building += "Node: " + buildingList.uat_node + "; ";
                            building += "Date: " + buildingList.uat_date + "; ";
                            building += "USAN CCR#: " + buildingList.uat_usan_ccr + "; ";
                            building += "Customer CCR#: " + buildingList.uat_ccr + "; ";
                            building += "Maintenance Start: " + buildingList.uat_maintenance_start + "; ";
                            building += "Conference Start: " + buildingList.uat_conference_start + "; ";
                            building += "Conference Bridge / PC: " + buildingList.uat_conference_bridge;
                        }
                        return building;
                    }
                case "maint":
                    {
                        if (db.UatProdInstalls.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.UatProdInstalls.First(a => a.project_id.Equals(int.Parse(filter))).maintenance_type;
                        }
                        return building;
                    }
                default:
                    break;
            }
            return building;
        }

        public String grabSWDAssessments(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "hardware":
                    {
                        if (db.HardwareRequirements.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.HardwareRequirements.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Description: " + buildingList[i].description + "; ";
                                building += "Cost Per Item: " + buildingList[i].cost_per_item+ "; ";
                                building += "Quantity: " + buildingList[i].quantity + "; ";
                                building += "Total Item Cost: " + buildingList[i].total_item_cost + "; ";
                                building += "Target Order Date: " + buildingList[i].target_order_date + "; ";
                                building += "Target Delivery: " + buildingList[i].target_delivery + "; ";
                                building += "Actual Order Date: " + buildingList[i].actual_order_date + "; ";
                                building += "Actual Delivery: " + buildingList[i].actual_delivery_date;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "systems":
                    {
                        if (db.SystemsAssessments.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var buildingList = db.SystemsAssessments.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Description: " + buildingList[i].description + "; ";
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Billed Hours: " + buildingList[i].billed_hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours + "; ";
                                building += "Target Start: " + buildingList[i].target_start + "; ";
                                building += "Target Complete: " + buildingList[i].target_complete + "; ";
                                building += "Scheduled Start: " + buildingList[i].scheduled_start + "; ";
                                building += "Scheduled Complete: " + buildingList[i].scheduled_complete + "; ";
                                building += "Actual Complete: " + buildingList[i].actual_complete;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "otherSaaS":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Other TLS_SaaS")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Other TLS_SaaS")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "prodSaaS":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Production Implementation TLS_SaaS")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Production Implementation TLS_SaaS")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "uatSupSaaS":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Support TLS_SaaS")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Support TLS_SaaS")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "uatImpSaaS":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Implementation TLS_SaaS")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Implementation TLS_SaaS")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "testingSaaS":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Testing TLS_SaaS")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Testing TLS_SaaS")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "codingSaaS":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Coding TLS_SaaS")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Coding TLS_SaaS")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "otherIP":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Other TLS_IP")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Other TLS_IP")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "prodIP":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Production Implementation TLS_IP")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Production Implementation TLS_IP")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "uatSupIP":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Support TLS_IP")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Support TLS_IP")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "uatImpIP":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Implementation TLS_IP")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Implementation TLS_IP")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "scriptsIP":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Scripts TLS_IP")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Scripts TLS_IP")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "accessIP":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("AccessUSAN SetUp TLS_IP")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("AccessUSAN SetUp TLS_IP")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "overhead":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Project Overhead")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Project Overhead")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "uat":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Support")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("UAT Support")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "qa":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("QA")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("QA")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours + "; ";
                                building += "Target Start: " + buildingList[i].requested_start_date + "; ";
                                building += "Target Complete: " + buildingList[i].requested_complete + "; ";
                                building += "Scheduled Start: " + buildingList[i].scheduled_start_date + "; ";
                                building += "Scheduled Complete: " + buildingList[i].scheduled_complete + "; ";
                                building += "Actual Complete: " + buildingList[i].actual_complete;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "misother":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("MIS Other")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("MIS Other")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours + "; ";
                                building += "Target Start: " + buildingList[i].requested_start_date + "; ";
                                building += "Target Complete: " + buildingList[i].requested_complete + "; ";
                                building += "Scheduled Start: " + buildingList[i].scheduled_start_date + "; ";
                                building += "Scheduled Complete: " + buildingList[i].scheduled_complete + "; ";
                                building += "Actual Complete: " + buildingList[i].actual_complete;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "testing":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Testing/Implementation")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Testing/Implementation")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "mis":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("MIS")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("MIS")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "coding":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Coding")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Coding")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours + "; ";
                                building += "Target Start: " + buildingList[i].requested_start_date + "; ";
                                building += "Target Complete: " + buildingList[i].requested_complete + "; ";
                                building += "Scheduled Start: " + buildingList[i].scheduled_start_date + "; ";
                                building += "Scheduled Complete: " + buildingList[i].scheduled_complete + "; ";
                                building += "Actual Complete: " + buildingList[i].actual_complete;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "requirements":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Requirements Clarification")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Requirements Clarification")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours + "; ";
                                building += "Target Start: " + buildingList[i].requested_start_date + "; ";
                                building += "Target Complete: " + buildingList[i].requested_complete + "; ";
                                building += "Scheduled Start: " + buildingList[i].scheduled_start_date + "; ";
                                building += "Scheduled Complete: " + buildingList[i].scheduled_complete + "; ";
                                building += "Actual Complete: " + buildingList[i].actual_complete;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "workflow":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Workflow")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Workflow")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "ba":
                    {
                        if (db.SWDAssessments.Count(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Design/Documentation")) > 0)
                        {
                            var buildingList = db.SWDAssessments.Where(a => a.project_id.Equals(int.Parse(filter)) && a.AssessmentType.type.Equals("Design/Documentation")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Name: " + buildingList[i].Contact.name + "; ";
                                building += "Notes: " + buildingList[i].action + "; ";
                                building += "Billed Hours: " + buildingList[i].hours + "; ";
                                building += "Booked Hours: " + buildingList[i].booked_hours + "; ";
                                building += "Target Start: " + buildingList[i].requested_start_date + "; ";
                                building += "Target Complete: " + buildingList[i].requested_complete + "; ";
                                building += "Scheduled Start: " + buildingList[i].scheduled_start_date + "; ";
                                building += "Scheduled Complete: " + buildingList[i].scheduled_complete + "; ";
                                building += "Actual Complete: " + buildingList[i].actual_complete;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                default:
                    break;
            }
            return building;
        }

        public String grabSWDSchedule(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "commentsSystems":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).systems_comments;
                        }
                        return building;
                    }
                case "commentsTLS":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).tls_comments;
                        }
                        return building;
                    }
                case "comments":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).comments;
                        }
                        return building;
                    }
                case "sud":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_uat_delivery;
                        }
                        return building;
                    }
                case "aud":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_uat_delivery;
                        }
                        return building;
                    }
                case "sss":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_systems_start;
                        }
                        return building;
                    }
                case "ssc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_systems_complete;
                        }
                        return building;
                    }
                case "asc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_systems_complete;
                        }
                        return building;
                    }
                case "sts":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_tls_start;
                        }
                        return building;
                    }
                case "stc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_tls_complete;
                        }
                        return building;
                    }
                case "atc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_tls_complete;
                        }
                        return building;
                    }
                case "aqc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_qa_complete;
                        }
                        return building;
                    }
                case "adc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_dev_complete;
                        }
                        return building;
                    }
                case "tso":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).target_scripts_ordered;
                        }
                        return building;
                    }
                case "tsd":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).target_scripts_delivered;
                        }
                        return building;
                    }
                case "asl":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_scripts_loaded;
                        }
                        return building;
                    }
                case "scfdc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_docs_to_customer;
                        }
                        return building;
                    }
                case "scfda":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_docs_approval;
                        }
                        return building;
                    }
                case "acfdc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_docs_to_customer;
                        }
                        return building;
                    }
                case "acfda":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_docs_approval;
                        }
                        return building;
                    }
                case "sbs":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_ba_start;
                        }
                        return building;
                    }
                case "sbc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_ba_complete;
                        }
                        return building;
                    }
                case "abc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_ba_complete;
                        }
                        return building;
                    }
                case "avc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).actual_vendor_complete;
                        }
                        return building;
                    }
                case "svc":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_vendor_complete;
                        }
                        return building;
                    }
                case "svs":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).scheduled_vendor_start;
                        }
                        return building;
                    }
                case "pmhours":
                    {
                        if (db.SWDSchedules.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            building = db.SWDSchedules.First(a => a.project_id.Equals(int.Parse(filter))).billable_pm_hours;
                        }
                        return building;
                    }
                default:
                    break;
            }
            return building;
        }

        



        public String grabTrafficRoutingDNIS(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "add":
                    {
                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && !a.route_to.Equals("") && a.remove_from.Equals(null)) > 0)
                        {
                            var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && !a.route_to.Equals("") && a.remove_from.Equals(null)).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "New Dnis: " + buildingList[i].dnis + "; ";
                                building += "APP To Be Added To: " + buildingList[i].route_to + "; ";
                                building += "Platform: " + buildingList[i].platform + "; ";
                                building += "Description: " + buildingList[i].description + "; ";
                                building += "USAN Prod Routing Date: " + buildingList[i].usan_date + "; ";
                                building += "USAN Prod Routing Time: " + buildingList[i].usan_time + "; ";
                                building += "DNIS Table Prod Load Date: " + buildingList[i].dnis_date + "; ";
                                building += "DNIS Table Prod Load Time: " + buildingList[i].dnis_time + "; ";
                                building += "Carrier Prod Routing Date: " + buildingList[i].carrier_date + "; ";
                                building += "Carrier Prod Routing Time: " + buildingList[i].carrier_time;
                                building += "Alias: " + buildingList[i].alias;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                case "change":
                    {
                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && !a.route_to.Equals("") && !a.remove_from.Equals("")) > 0)
                        {
                            var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && !a.route_to.Equals("") && !a.remove_from.Equals("")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Existing Dnis: " + buildingList[i].dnis + "; ";
                                building += "APP To Be Added To: " + buildingList[i].route_to + "; ";
                                building += "Platform: " + buildingList[i].platform + "; ";
                                building += "Description: " + buildingList[i].description + "; ";
                                building += "App To Be Removed From: " + buildingList[i].remove_from + "; ";
                                building += "USAN Prod Routing Date: " + buildingList[i].usan_date + "; ";
                                building += "USAN Prod Routing Time: " + buildingList[i].usan_time + "; ";
                                building += "DNIS Table Prod Load Date: " + buildingList[i].dnis_date + "; ";
                                building += "DNIS Table Prod Load Time: " + buildingList[i].dnis_time + "; ";
                                building += "Carrier Prod Routing Date: " + buildingList[i].carrier_date + "; ";
                                building += "Carrier Prod Routing Time: " + buildingList[i].carrier_time;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                case "delete":
                    {
                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && !a.remove_from.Equals("") && a.route_to.Equals(null)) > 0)
                        {
                            var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && !a.remove_from.Equals("") && a.route_to.Equals(null)).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Existing Dnis: " + buildingList[i].dnis + "; ";
                                building += "App To Be Removed From: " + buildingList[i].remove_from + "; ";
                                building += "Platform: " + buildingList[i].platform + "; ";
                                building += "Description: " + buildingList[i].description + "; ";
                                building += "USAN Prod Routing Date: " + buildingList[i].usan_date +"; ";
                                building += "USAN Prod Routing Time: " + buildingList[i].usan_time;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                default:
                    {
                        break;
                    }

            }
            return building;
        }

        public String grabTrafficRoutingData(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "forecast":
                    {
                        building = db.TrafficRequirements.First(a => a.project_id.Equals(int.Parse(filter))).forecast.Equals(true) ? "true" : "false";
                        return building;
                    }
                case "minmo":
                    {
                        building = db.TrafficRequirements.First(a => a.project_id.Equals(int.Parse(filter))).min_month;
                        return building;
                    }
                case "callsmo":
                    {
                        building = db.TrafficRequirements.First(a => a.project_id.Equals(int.Parse(filter))).calls_month;
                        return building;
                    }
                case "busycalls":
                    {
                        building = db.TrafficRequirements.First(a => a.project_id.Equals(int.Parse(filter))).busy_hour_calls;
                        return building;
                    }
                case "busypercentage":
                    {
                        building = db.TrafficRequirements.First(a => a.project_id.Equals(int.Parse(filter))).busy_hour_call_percentage;
                        return building;
                    }
                case "average":
                    {
                        building = db.TrafficRequirements.First(a => a.project_id.Equals(int.Parse(filter))).avg_call_duration;
                        return building;
                    }
                default:
                    break;

            }
            return building;
        }


        public String grabMISNewDNIS(CookDBDataContext db, string filter)
        {
            string building = "";
            int currentProjMisNewId = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).mis_new_id;
            if (db.MISNewDnis.Count(a => a.mis_new_id.Equals(currentProjMisNewId) && !a.route_to.Equals("")) > 0)
            {
                var buildingList = db.MISNewDnis.Where(a => a.mis_new_id.Equals(currentProjMisNewId) && !a.route_to.Equals("")).ToList();
                for (int i = 0; i < buildingList.Count(); i++)
                {
                    building += "New Dnis: " + buildingList[i].dnis + "; ";
                    building += "APP/MIS To Be Added To: " + buildingList[i].route_to + "; ";
                    building += "Platform: " + buildingList[i].platform + "; ";
                    building += "Description: " + buildingList[i].description + "; ";
                    building += "Effective Date: " + buildingList[i].effective_date;
                    if (i + 1 < buildingList.Count())
                    {
                        building += " | ";
                    }
                }

            }
            return building;
        }

        public String grabMISNewDistribution(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            int currentProjMisNewId = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).mis_new_id;
            switch (type)
            {
                case "add":
                    {
                        if (db.MISNewDistributions.Count(a => a.mis_new_id.Equals(currentProjMisNewId) && a.add_or_delete.Equals("add")) > 0)
                        {
                            var buildingList = db.MISNewDistributions.Where(a => a.mis_new_id.Equals(currentProjMisNewId) && a.add_or_delete.Equals("add")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += buildingList[i].Contact.name;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += "; ";
                                }
                            }
                            
                        }
                        return building;
                    }
                case "delete":
                    {
                        if (db.MISNewDistributions.Count(a => a.mis_new_id.Equals(currentProjMisNewId) && a.add_or_delete.Equals("delete")) > 0)
                        {
                            var buildingList = db.MISNewDistributions.Where(a => a.mis_new_id.Equals(currentProjMisNewId) && a.add_or_delete.Equals("delete")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += buildingList[i].Contact.name;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += "; ";
                                }
                            }

                        }
                        return building;
                    }
                default:
                    {
                        break;
                    }

            }
            return building;
        }


        public String grabMISNewDelivery(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            int currentProjMisNewId = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).mis_new_id;
            switch (type)
            {
                case "method":
                    {
                        try
                        {
                            building = db.MISNewDeliveries.First(a => a.mis_new_id.Equals(currentProjMisNewId)).method;
                        }
                        catch (Exception)
                        {
                        }
                        return building;
                    }
                case "format":
                    {
                        try
                        {
                            building = db.MISNewDeliveries.First(a => a.mis_new_id.Equals(currentProjMisNewId)).format;
                        }
                        catch (Exception)
                        {
                        }
                        return building;
                    }
                case "frequency":
                    {
                        try
                        {
                            building = db.MISNewDeliveries.First(a => a.mis_new_id.Equals(currentProjMisNewId)).frequency;
                        }
                        catch (Exception)
                        {
                        }
                        return building;
                    }
                default:
                    {
                        break;
                    }
                    
            }
            
            return building;
        }


        public String grabMISNewReportNames(CookDBDataContext db, string filter)
        {
            string building = "";
            int currentProjMisNewId = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).mis_new_id;
            try
            {
                building = db.MISNewReportNames.First(a => a.mis_new_id.Equals(currentProjMisNewId)).report_name;
            }
            catch (Exception)
            {
            }
            return building;
        }

        public String grabMISNewApplication(CookDBDataContext db, string filter)
        {
            string building = "";
            int currentProjMisNewId = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).mis_new_id;
            try
            {
                building = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).application_group;
            }
            catch (Exception)
            {
            }
            return building;
        }

        public String grabMISNewBUDivision(CookDBDataContext db, string filter)
        {
            string building = "";
            int currentProjMisNewId = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).mis_new_id;
            try
            {
                building = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).BusinessUnit.name;
            }
            catch (Exception)
            {
            }
            return building;
        }

        public String grabMISNewReportDescription(CookDBDataContext db, string filter)
        {
            string building = "";
            int currentProjMisNewId = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).mis_new_id;
            try
            {
                building = db.MISNews.First(a => a.project_id.Equals(int.Parse(filter))).description;
            }
            catch (Exception)
            {
            }
            return building;
        }

        public String grabMISUpdateDNIS(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            int currentProjMisUpdateId = db.MISUpdates.First(a => a.project_id.Equals(int.Parse(filter))).mis_update_id;
            switch (type)
            {
                case "add":
                    {
                        if (db.MISUpdateDNIs.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId) && !a.route_to.Equals(null) && a.reroute_to.Equals(null) && !a.route_to.Equals("") && a.remove_from.Equals(null)) > 0)
                        {
                            var currentRpt = db.MISUpdateDNIs.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId) && !a.route_to.Equals(null) && a.reroute_to.Equals(null) && !a.route_to.Equals("") && a.remove_from.Equals(null)).ToList();
                            for (int i = 0; i < currentRpt.Count(); i++)
                            {
                                building += "New DNIS: " + currentRpt[i].dnis + "; ";
                                building += "APP/MIS To Be Added To: " + currentRpt[i].route_to+ "; ";
                                building += "Platform: " + currentRpt[i].platform + "; ";
                                building += "Description: " + currentRpt[i].description + "; ";
                                building += "Effective Date: " + currentRpt[i].effective_date;
                                if (i + 1 < currentRpt.Count())
                                {
                                    building += " | ";
                                }
                            }
                            return building;
                        }
                        break;
                    }
                case "change":
                    {
                        if (db.MISUpdateDNIs.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId) && !a.reroute_to.Equals(null) && !a.reroute_to.Equals("")) > 0)
                        {
                            var currentRpt = db.MISUpdateDNIs.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId) && !a.reroute_to.Equals(null) && !a.reroute_to.Equals("")).ToList();
                            for (int i = 0; i < currentRpt.Count(); i++)
                            {
                                building += "New DNIS: " + currentRpt[i].dnis + "; ";
                                building += "APP/MIS To Be Added To: " + currentRpt[i].route_to + "; ";
                                building += "Platform: " + currentRpt[i].platform + "; ";
                                building += "Description: " + currentRpt[i].description + "; ";
                                building += "APP/MIS To Be Removed From: " + currentRpt[i].remove_from + "; ";
                                building += "Platform: " + currentRpt[i].platform_from + "; ";
                                building += "Effective Date: " + currentRpt[i].effective_date;
                                if (i + 1 < currentRpt.Count())
                                {
                                    building += " | ";
                                }
                            }
                            return building;
                        }
                        break;
                    }
                case "delete":
                    {
                        if (db.MISUpdateDNIs.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId) && a.route_to.Equals(null) && a.reroute_to.Equals(null) && !a.remove_from.Equals(null) && !a.remove_from.Equals("")) > 0)
                        {
                            var currentRpt = db.MISUpdateDNIs.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId) && a.route_to.Equals(null) && a.reroute_to.Equals(null) && !a.remove_from.Equals(null) && !a.remove_from.Equals("")).ToList();
                            for (int i = 0; i < currentRpt.Count(); i++)
                            {
                                building += "New DNIS: " + currentRpt[i].dnis + "; ";
                                building += "APP/MIS To Be Removed From: " + currentRpt[i].remove_from + "; ";
                                building += "Platform: " + currentRpt[i].platform + "; ";
                                building += "Description: " + currentRpt[i].description + "; ";
                                building += "Effective Date: " + currentRpt[i].effective_date;
                                if (i + 1 < currentRpt.Count())
                                {
                                    building += " | ";
                                }
                            }
                            return building;
                        }
                        break;
                    }

                default:
                    break;
            }
            return building;
        }

        public String grabMISUpdateDelivery(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            int currentProjMisUpdateId = db.MISUpdates.First(a => a.project_id.Equals(int.Parse(filter))).mis_update_id;
            switch (type)
            {
                case "method":
                    {
                        if (db.MISUpdateDeliveryChanges.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId)) > 0)
                        {
                            var currentRpt = db.MISUpdateDeliveryChanges.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId)).ToList();
                            for (int i = 0; i < currentRpt.Count(); i++)
                            {
                                building += currentRpt[i].method;
                            }
                            return building;
                        }
                        break;
                    }
                case "format":
                    {
                        if (db.MISUpdateDeliveryChanges.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId)) > 0)
                        {
                            var currentRpt = db.MISUpdateDeliveryChanges.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId)).ToList();
                            for (int i = 0; i < currentRpt.Count(); i++)
                            {
                                building += currentRpt[i].format;
                            }
                            return building;
                        }
                        break;
                    }
                case "frequency":
                    {
                        if (db.MISUpdateDeliveryChanges.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId)) > 0)
                        {
                            var currentRpt = db.MISUpdateDeliveryChanges.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId)).ToList();
                            for (int i = 0; i < currentRpt.Count(); i++)
                            {
                                building += currentRpt[i].frequency_id;
                            }
                            return building;
                        }
                        break;
                    }

                default:
                    break;
            }
            return building;
        }

        public String grabMISUpdateEmails(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            int currentProjMisUpdateId = db.MISUpdates.First(a => a.project_id.Equals(int.Parse(filter))).mis_update_id;
            if (db.MISUpdateDistributionChanges.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId) && a.add_or_delete.Equals(type)) > 0)
            {
                var currentRpt = db.MISUpdateDistributionChanges.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId) && a.add_or_delete.Equals(type)).ToList();
                for (int i = 0; i < currentRpt.Count(); i++)
                {
                    building += currentRpt[i].Contact.name;
                    if (i + 1 < currentRpt.Count())
                    {
                        building += "; ";
                    }
                }
            }
            return building;
        }

        public String grabMISUpdateReportDescription(CookDBDataContext db, string filter)
        {
            string building = "";
            if (db.MISUpdates.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
            {
                var currentRpt = db.MISUpdates.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                for (int i = 0; i < currentRpt.Count(); i++)
                {
                    building += currentRpt[i].description;
                }
            }
            return building;
        }

        public String grabMISUpdateReportNames(CookDBDataContext db, string filter)
        {
            string building = "";
            int currentProjMisUpdateId = db.MISUpdates.First(a => a.project_id.Equals(int.Parse(filter))).mis_update_id;
            if (db.MISUpdateReportNames.Count(a => a.mis_update_id.Equals(currentProjMisUpdateId)) > 0)
            {
                var currentRpt = db.MISUpdateReportNames.Where(a => a.mis_update_id.Equals(currentProjMisUpdateId)).ToList();
                for (int i = 0; i < currentRpt.Count(); i++)
                {
                    building += currentRpt[i].report_name;
                    if (i + 1 < currentRpt.Count())
                    {
                        building += "; ";
                    }
                }
            }
            return building;
        }

        


        public String getRequirementsInfo(CookDBDataContext db, string filter, string reqType)
        {
            string building = "";
            switch (reqType) {
                case "Doc":{
                    if (db.DocumentationReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                    {
                        var currentReq = db.DocumentationReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                        for (int i = 0; i < currentReq.Count(); i++)
                        {
                            building += "Filename: " + currentReq[i].filename + "; ";
                            building += "Latest Version: " + currentReq[i].latest_version + "; ";
                            building += "UAT Version: " + currentReq[i].uat_version + "; ";
                            building += "PROD Version: " + currentReq[i].prod_version + "; ";
                            building += "Notes: " + currentReq[i].notes;
                            if (i + 1 < currentReq.Count())
                            {
                                building += " | ";
                            }
                        }
                    }
                    return building;
                }
                case "App":
                    {
                        if (db.ApplicationReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.ApplicationReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "APP File: " + currentReq[i].app_file + "; ";
                                building += "RPT File: " + currentReq[i].rpt_file + "; ";
                                building += "PRM File: " + currentReq[i].prm_file + "; ";
                                building += "PRM Instructions .txt: " + currentReq[i].prm_instructions + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Table":
                    {
                        if (db.TableReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.TableReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "xls/csv File: " + currentReq[i].xls_csv_file + "; ";
                                building += "def.csv File: " + currentReq[i].def_file + "; ";
                                building += ".etm File: " + currentReq[i].etm_file + "; ";
                                building += "Table Type: " + currentReq[i].table_type + "; ";
                                building += "UAT Load: " + currentReq[i].uat_load + "; ";
                                building += "PROD Load: " + currentReq[i].prod_load + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Scraper":
                    {
                        if (db.ScraperReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.ScraperReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Exe File: " + currentReq[i].exe_file + "; ";
                                building += "Pdb File: " + currentReq[i].pdb_file + "; ";
                                try
                                {
                                    building += "Scraper Type: " + currentReq[i].ScraperType.type + "; ";
                                } catch(Exception)
                                {
                                }
                                building += "New Tran Type: " + currentReq[i].new_tran_type + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Engine":
                    {
                        if (db.EngineReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.EngineReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Exe File: " + currentReq[i].exe_file + "; ";
                                building += "Pdb File: " + currentReq[i].pdb_file + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Manager":
                    {
                        if (db.ManagerReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.ManagerReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Exe File: " + currentReq[i].exe_file + "; ";
                                building += "Pdb File: " + currentReq[i].pdb_file + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Grammar":
                    {
                        if (db.GrammarReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.GrammarReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Filename: " + currentReq[i].filename + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "VXML":
                    {
                        if (db.VXMLReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.VXMLReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "NDM Grammar Description: " + currentReq[i].description + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "DB":
                    {
                        if (db.BackofficeDBReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.BackofficeDBReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "SQL File: " + currentReq[i].sql_file + "; ";
                                building += "Instructions .txt: " + currentReq[i].instructions + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Process":
                    {
                        if (db.BackofficeProcessReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.BackofficeProcessReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Exe File: " + currentReq[i].exe_file + "; ";
                                building += "INI/CFG file: " + currentReq[i].config_file + "; ";
                                building += "Instructions .txt: " + currentReq[i].instructions + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Webservice":
                    {
                        if (db.BackofficeWebserviceReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.BackofficeWebserviceReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "WAR File: " + currentReq[i].war_file + "; ";
                                building += "TAR file: " + currentReq[i].tar_file + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Config":
                    {
                        if (db.ConfigFileReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.ConfigFileReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Filename: " + currentReq[i].filename + "; ";
                                building += "Instructions .txt: " + currentReq[i].instructions + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Fax":
                    {
                        if (db.FaxFormReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.FaxFormReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Filename: " + currentReq[i].filename + "; ";
                                building += "Instructions .txt: " + currentReq[i].instructions + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Xfer":
                    {
                        if (db.FileXferReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.FileXferReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Name: " + currentReq[i].name + "; ";
                                building += "Upload/Download: " + currentReq[i].upload_or_download + "; ";
                                building += "UAT or PROD: " + currentReq[i].uat_or_prod + "; ";
                                building += "NDM File: " + currentReq[i].ndm_file + "; ";
                                building += "Transmission Protocol: " + currentReq[i].protocol + "; ";
                                building += "Transmission Timeframe: " + currentReq[i].timeframe + "; ";
                                building += "Sending Site: " + currentReq[i].send_site + "; ";
                                building += "Recieving Site: " + currentReq[i].recv_site + "; ";
                                building += "USAN Password: " + currentReq[i].usan_password + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "TTS":
                    {
                        if (db.TTSFunctionalityReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.TTSFunctionalityReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Call Volume: " + currentReq[i].call_volume + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "TNT":
                    {
                        if (db.TNTFunctionalityReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.TNTFunctionalityReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Call Volume: " + currentReq[i].call_volume + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Speech":
                    {
                        if (db.SpeechRecognitionReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.SpeechRecognitionReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Call Volume: " + currentReq[i].call_volume + "; ";
                                building += "Language: " + currentReq[i].language + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "UUI":
                    {
                        if (db.UUIReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.UUIReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Call Volume: " + currentReq[i].call_volume + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Service":
                    {
                        if (db.ServiceIDReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.ServiceIDReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Customer app/USAN project: " + currentReq[i].product + "; ";
                                building += "Service ID: " + currentReq[i].service_id + "; ";
                                try
                                {
                                    building += "Business Unit/Division: " + currentReq[i].BusinessUnit.name + "; ";
                                }
                                catch (Exception)
                                {
                                }
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                case "Other":
                    {
                        if (db.OtherReqs.Count(a => a.project_id.Equals(int.Parse(filter))) > 0)
                        {
                            var currentReq = db.OtherReqs.Where(a => a.project_id.Equals(int.Parse(filter))).ToList();
                            for (int i = 0; i < currentReq.Count(); i++)
                            {
                                building += "New: " + currentReq[i].@new + "; ";
                                building += "Misc: " + currentReq[i].misc + "; ";
                                building += "Notes: " + currentReq[i].notes;
                                if (i + 1 < currentReq.Count())
                                {
                                    building += " | ";
                                }
                            }
                        }
                        return building;
                    }
                default: 
                    break;
            }
            return "";
        }

        public String getCheckboxValues(CookDBDataContext db, string filter, string boxType)
        {
            switch (boxType) {
                case "0":
                    {
                        return "none selected";
                    }
                case "1":
                    {
                        return "Existing";
                    }
                case "2":
                    {
                        return "New";
                    }
                case "3":
                    {
                        return "Existing & New";
                    }
                default:{
                    break;
                }
            }
            return "";
        }

        public String getAllContacts(CookDBDataContext db, string filter, string contactType)
        {
            string building = "";
            if (db.ProjectContacts.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type == contactType) > 0)
            {
                var currentContact = db.ProjectContacts.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type == contactType).ToList();
                for (int i = 0; i < currentContact.Count(); i++)
                {
                    building += currentContact[i].Contact.name;
                    if (i + 1 < currentContact.Count())
                    {
                        building += "; ";
                    }
                }
            }
            return building;
        }
    }
}