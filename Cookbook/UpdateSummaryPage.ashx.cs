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
    /// Summary description for UpdateSummaryPage
    /// </summary>
    public class UpdateSummaryPage : DatabaseHandler
    {
        string logBuilder = "";
        string comment = "comments: ";
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string gridNeedsRefresh = "";
            string intro = "The summary page had the following modifications: ";
            logBuilder = "";
            string logBuilderCheckBoxes = "";
            string logBuilderRadioButtons = "";
            IQueryable<ProjectInformation> q = db.ProjectInformations;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            string username = context.Request.Params.Get("user_name");
            string permission = context.Request.Params.Get("permission");
            if (!isNull(filter))
            {
                ProjectInformation proj = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));

                //check to see if entered project number already exists. if it does, nothing will be saved
                if (((String)blob["usanProjectNumber"]) != null)
                {
                    if (((String)blob["usanProjectNumber"]).Trim().Length == 0)
                    {
                        return new PagedData("Project Number Already Exists", false);
                    }
                    var numProjsList = db.ProjectInformations.Where(e => e.project_number.Equals((String)blob["usanProjectNumber"])).ToList();
                    if (numProjsList.Count > 0)
                    {
                        if (numProjsList[0].project_id != Convert.ToInt32(filter))
                        {
                            return new PagedData("Project Number Already Exists", false);
                        }
                    }
                }
                else
                {
                    return new PagedData("Project Number Already Exists", false);
                }
                //check to see if project number or name has changed for the current project
                if (((String)blob["usanProjectNumber"]) != null)
                {
                    string storedProjectNumber = db.ProjectInformations.First(b => b.project_id.Equals(Convert.ToInt32(filter))).project_number;
                    if (!((String)blob["usanProjectNumber"]).Equals(storedProjectNumber))
                    {
                        gridNeedsRefresh = "refresh needed: ["+(String)blob["usanProjectNumber"]+"]";
                    }
                }

                if (((String)blob["summaryProjectName"]) != null)
                {
                    string storedProjectName = db.ProjectInformations.First(b => b.project_id.Equals(Convert.ToInt32(filter))).project_name;
                    if (!((String)blob["summaryProjectName"]).Equals(storedProjectName))
                    {
                        if (((String)blob["usanProjectNumber"]) != null)
                        {
                            gridNeedsRefresh = "refresh needed: [" + (String)blob["usanProjectNumber"] + "]";
                        }
                        else
                        {
                            gridNeedsRefresh = "refresh needed: [ ]";
                        }
                    }
                }

                //checkboxes
                if (proj.access_usan_user_access != determineCheckBoxVal("summaryAccessUSANAccessUser", blob))
                {
                    logBuilderCheckBoxes += "AccessUSAN Access/User checkbox changed: \"" + proj.access_usan_user_access + "\" -> \"" + determineCheckBoxVal("summaryAccessUSANAccessUser", blob) + "\"; ";
                }
                proj.access_usan_user_access = determineCheckBoxVal("summaryAccessUSANAccessUser", blob);  //(String)blob["summaryAccessUSANAccessUser1"]; }

                if (proj.application != determineCheckBoxVal("summaryApplication", blob))
                {
                    logBuilderCheckBoxes += "Application checkbox changed: \"" + proj.application + "\" -> \"" + determineCheckBoxVal("summaryApplication", blob) + "\"; ";
                }
                proj.application = determineCheckBoxVal("summaryApplication", blob);  //     (String)blob["summaryApplication1"]; }

                if (proj.backoffice_db != determineCheckBoxVal("summaryBackOfficeDB", blob))
                {
                    logBuilderCheckBoxes += "Back Office DB checkbox changed: \"" + proj.backoffice_db + "\" -> \"" + determineCheckBoxVal("summaryBackOfficeDB", blob) + "\"; ";
                }
                proj.backoffice_db = determineCheckBoxVal("summaryBackOfficeDB", blob);  //(String)blob["summaryBackOfficeDB1"]; }

                if (proj.backoffice_process != determineCheckBoxVal("summaryBackOfficeProcess", blob))
                {
                    logBuilderCheckBoxes += "Back Office Process checkbox changed: \"" + proj.backoffice_process + "\" -> \"" + determineCheckBoxVal("summaryBackOfficeProcess", blob) + "\"; ";
                }
                proj.backoffice_process = determineCheckBoxVal("summaryBackOfficeProcess", blob);  //(String)blob["summaryBackOfficeProcess1"]; }

                if (proj.backoffice_webservices != determineCheckBoxVal("summaryBackOfficeWebServices", blob))
                {
                    logBuilderCheckBoxes += "Back Office Web Services checkbox changed: \"" + proj.backoffice_webservices + "\" -> \"" + determineCheckBoxVal("summaryBackOfficeWebServices", blob) + "\"; ";
                }
                proj.backoffice_webservices = determineCheckBoxVal("summaryBackOfficeWebServices", blob);  //(String)blob["summaryBackOfficeWebServices1"]; }

                if (proj.biso_approval != determineCheckBoxVal("summaryBisoApproval", blob))
                {
                    logBuilderCheckBoxes += "Biso Approval checkbox changed: \"" + proj.biso_approval + "\" -> \"" + determineCheckBoxVal("summaryBisoApproval", blob) + "\"; ";
                }
                proj.biso_approval = determineCheckBoxVal("summaryBisoApproval", blob);  //(String)blob["summaryBisoApproval1"]; }

                if (proj.doc_other != determineCheckBoxVal("summaryDocumentationOther", blob))
                {
                    logBuilderCheckBoxes += "Documentation Other checkbox changed: \"" + proj.doc_other + "\" -> \"" + determineCheckBoxVal("summaryDocumentationOther", blob) + "\"; ";
                }
                proj.doc_other = determineCheckBoxVal("summaryDocumentationOther", blob);  //(String)blob["summaryDocumentationOther1"]; }

                if (proj.doc_decommission != determineCheckBoxVal("summaryDocumentationDecommission", blob))
                {
                    logBuilderCheckBoxes += "Documentation Decommission checkbox changed: \"" + proj.doc_decommission + "\" -> \"" + determineCheckBoxVal("summaryDocumentationDecommission", blob) + "\"; ";
                }
                proj.doc_decommission = determineCheckBoxVal("summaryDocumentationDecommission", blob);

                if (proj.application_decommission != determineCheckBoxVal("summaryApplicationDecommission", blob))
                {
                    logBuilderCheckBoxes += "Application Decommission checkbox changed: \"" + proj.application_decommission + "\" -> \"" + determineCheckBoxVal("summaryApplicationDecommission", blob) + "\"; ";
                }
                proj.application_decommission = determineCheckBoxVal("summaryApplicationDecommission", blob);

                if (proj.parm_decommission != determineCheckBoxVal("summaryParmDecommission", blob))
                {
                    logBuilderCheckBoxes += "Parm Decommission checkbox changed: \"" + proj.parm_decommission + "\" -> \"" + determineCheckBoxVal("summaryParmDecommission", blob) + "\"; ";
                }
                proj.parm_decommission = determineCheckBoxVal("summaryParmDecommission", blob);

                if (proj.reporting_decommission != determineCheckBoxVal("summaryReportingDecommission", blob))
                {
                    logBuilderCheckBoxes += "Reporting Decommission checkbox changed: \"" + proj.reporting_decommission + "\" -> \"" + determineCheckBoxVal("summaryReportingDecommission", blob) + "\"; ";
                }
                proj.reporting_decommission = determineCheckBoxVal("summaryReportingDecommission", blob);

                if (proj.tables_decommission != determineCheckBoxVal("summaryTablesDecommission", blob))
                {
                    logBuilderCheckBoxes += "Tables Decommission checkbox changed: \"" + proj.tables_decommission + "\" -> \"" + determineCheckBoxVal("summaryTablesDecommission", blob) + "\"; ";
                }
                proj.tables_decommission = determineCheckBoxVal("summaryTablesDecommission", blob); 


                if (proj.doc_vui != determineCheckBoxVal("summaryDocumentationVUI", blob))
                {
                    logBuilderCheckBoxes += "Documentation VUI checkbox changed: \"" + proj.doc_vui + "\" -> \"" + determineCheckBoxVal("summaryDocumentationVUI", blob) + "\"; ";
                }
                proj.doc_vui = determineCheckBoxVal("summaryDocumentationVUI", blob);  //(String)blob["summaryDocumentationVUI1"]; }

                if (proj.doc_visio != determineCheckBoxVal("summaryDocumentationVisio", blob))
                {
                    logBuilderCheckBoxes += "Documentation VISIO checkbox changed: \"" + proj.doc_visio + "\" -> \"" + determineCheckBoxVal("summaryDocumentationVisio", blob) + "\"; ";
                }
                proj.doc_visio = determineCheckBoxVal("summaryDocumentationVisio", blob);  //(String)blob["summaryDocumentationVisio1"]; }

                if (proj.engine != determineCheckBoxVal("summaryEngine", blob))
                {
                    logBuilderCheckBoxes += "Engine checkbox changed: \"" + proj.engine + "\" -> \"" + determineCheckBoxVal("summaryEngine", blob) + "\"; ";
                }
                proj.engine = determineCheckBoxVal("summaryEngine", blob);  //(String)blob["summaryEngine1"]; }

                if (proj.grammars_standard != determineCheckBoxVal("summaryGrammarsStandard", blob))
                {
                    logBuilderCheckBoxes += "Grammars Standard checkbox changed: \"" + proj.grammars_standard + "\" -> \"" + determineCheckBoxVal("summaryGrammarsStandard", blob) + "\"; ";
                }
                proj.grammars_standard = determineCheckBoxVal("summaryGrammarsStandard", blob);  //(String)blob["summaryGrammarsStandard1"]; }

                if (proj.grammars_vxml != determineCheckBoxVal("summaryGrammarsVXML", blob))
                {
                    logBuilderCheckBoxes += "Grammars VXML checkbox changed: \"" + proj.grammars_vxml + "\" -> \"" + determineCheckBoxVal("summaryGrammarsVXML", blob) + "\"; ";
                }
                proj.grammars_vxml = determineCheckBoxVal("summaryGrammarsVXML", blob);  //(String)blob["summaryGrammarsVXML1"]; }

                if (proj.host_connectivity != determineCheckBoxVal("summaryHostConnectivity", blob))
                {
                    logBuilderCheckBoxes += "Host Connectivity checkbox changed: \"" + proj.host_connectivity + "\" -> \"" + determineCheckBoxVal("summaryHostConnectivity", blob) + "\"; ";
                }
                proj.host_connectivity = determineCheckBoxVal("summaryHostConnectivity", blob);  //(String)blob["summaryHostConnectivity1"]; }

                if (proj.host_wsdl != determineCheckBoxVal("summaryHostWSDL", blob))
                {
                    logBuilderCheckBoxes += "Host WSDL checkbox changed: \"" + proj.host_wsdl + "\" -> \"" + determineCheckBoxVal("summaryHostWSDL", blob) + "\"; ";
                }
                proj.host_wsdl = determineCheckBoxVal("summaryHostWSDL", blob);  //(String)blob["summaryHostWSDL1"]; }

                if (proj.network_file_transfer != determineCheckBoxVal("summaryNetworkFileTransfer", blob))
                {
                    logBuilderCheckBoxes += "Network File Transfer checkbox changed: \"" + proj.network_file_transfer + "\" -> \"" + determineCheckBoxVal("summaryNetworkFileTransfer", blob) + "\"; ";
                }
                proj.network_file_transfer = determineCheckBoxVal("summaryNetworkFileTransfer", blob);  //(String)blob["summaryNetworkFileTransfer1"]; }

                if (proj.network_infrastructure != determineCheckBoxVal("summaryNetworkInfrastructure", blob))
                {
                    logBuilderCheckBoxes += "Network Infrastructure checkbox changed: \"" + proj.network_infrastructure + "\" -> \"" + determineCheckBoxVal("summaryNetworkInfrastructure", blob) + "\"; ";
                }
                proj.network_infrastructure = determineCheckBoxVal("summaryNetworkInfrastructure", blob);  //(String)blob["summaryNetworkInfrastructure1"]; }

                if (proj.new_tran_type != determineCheckBoxVal("summaryNewTranType", blob))
                {
                    logBuilderCheckBoxes += "Tran Type checkbox changed: \"" + proj.new_tran_type + "\" -> \"" + determineCheckBoxVal("summaryNewTranType", blob) + "\"; ";
                }
                proj.new_tran_type = determineCheckBoxVal("summaryNewTranType", blob);  //(String)blob["summaryNewTranType1"]; }

                if (proj.nuance_development != determineCheckBoxVal("summaryNuanceDevelopment", blob))
                {
                    logBuilderCheckBoxes += "Nuance Development checkbox changed: \"" + proj.nuance_development + "\" -> \"" + determineCheckBoxVal("summaryNuanceDevelopment", blob) + "\"; ";
                }
                proj.nuance_development = determineCheckBoxVal("summaryNuanceDevelopment", blob);  //(String)blob["summaryNuanceDevelopment1"]; }

                if (proj.nuance_ndm != determineCheckBoxVal("summaryNuanceNDM", blob))
                {
                    logBuilderCheckBoxes += "Nuance NDM checkbox changed: \"" + proj.nuance_ndm + "\" -> \"" + determineCheckBoxVal("summaryNuanceNDM", blob) + "\"; ";
                }
                proj.nuance_ndm = determineCheckBoxVal("summaryNuanceNDM", blob);  //(String)blob["summaryNuanceNDM1"]; }

                if (proj.other != determineCheckBoxVal("summaryOther", blob))
                {
                    logBuilderCheckBoxes += "Other checkbox changed: \"" + proj.other + "\" -> \"" + determineCheckBoxVal("summaryOther", blob) + "\"; ";
                }
                proj.other = determineCheckBoxVal("summaryOther", blob);  //(String)blob["summaryOther1"]; }

                if (proj.parm != determineCheckBoxVal("summaryParm", blob))
                {
                    logBuilderCheckBoxes += "Parm checkbox changed: \"" + proj.parm + "\" -> \"" + determineCheckBoxVal("summaryParm", blob) + "\"; ";
                }
                proj.parm = determineCheckBoxVal("summaryParm", blob);  //(String)blob["summaryParm1"]; }

                if (proj.prompts_nlu != determineCheckBoxVal("summaryPromptsNLU", blob))
                {
                    logBuilderCheckBoxes += "Prompts NLU checkbox changed: \"" + proj.prompts_nlu + "\" -> \"" + determineCheckBoxVal("summaryPromptsNLU", blob) + "\"; ";
                }
                proj.prompts_nlu = determineCheckBoxVal("summaryPromptsNLU", blob);  //(String)blob["summaryPromptsNLU1"]; }

                if (proj.prompts_standard != determineCheckBoxVal("summaryPromptsStandard", blob))
                {
                    logBuilderCheckBoxes += "Prompts Standard checkbox changed: \"" + proj.prompts_standard + "\" -> \"" + determineCheckBoxVal("summaryPromptsStandard", blob) + "\"; ";
                }
                proj.prompts_standard = determineCheckBoxVal("summaryPromptsStandard", blob);  //(String)blob["summaryPromptsStandard1"]; }

                if (proj.readi800 != determineCheckBoxVal("summaryReadi800", blob))
                {
                    logBuilderCheckBoxes += "Readi800 checkbox changed: \"" + proj.readi800 + "\" -> \"" + determineCheckBoxVal("summaryReadi800", blob) + "\"; ";
                }
                proj.readi800 = determineCheckBoxVal("summaryReadi800", blob);  //(String)blob["summaryReadi8001"]; }

                if (proj.reporting_button != determineCheckBoxVal("summaryReportingButton", blob))
                {
                    logBuilderCheckBoxes += "Reporting Button checkbox changed: \"" + proj.reporting_button + "\" -> \"" + determineCheckBoxVal("summaryReportingButton", blob) + "\"; ";
                }
                proj.reporting_button = determineCheckBoxVal("summaryReportingButton", blob);  //(String)blob["summaryReportingButton1"]; }

                if (proj.reporting_other != determineCheckBoxVal("summaryReportingOther", blob))
                {
                    logBuilderCheckBoxes += "Reporting Other checkbox changed: \"" + proj.reporting_other + "\" -> \"" + determineCheckBoxVal("summaryReportingOther", blob) + "\"; ";
                }
                proj.reporting_other = determineCheckBoxVal("summaryReportingOther", blob);  //(String)blob["summaryReportingOther1"]; }

                if (proj.reporting_vision != determineCheckBoxVal("summaryReportingVision", blob))
                {
                    logBuilderCheckBoxes += "Reporting Vision checkbox changed: \"" + proj.reporting_vision + "\" -> \"" + determineCheckBoxVal("summaryReportingVision", blob) + "\"; ";
                }
                proj.reporting_vision = determineCheckBoxVal("summaryReportingVision", blob);  //(String)blob["summaryReportingVision1"]; }

                if (proj.routing_dap_ss7 != determineCheckBoxVal("summaryRoutingDAPSS7", blob))
                {
                    logBuilderCheckBoxes += "Routing DAP/SS7 checkbox changed: \"" + proj.routing_dap_ss7 + "\" -> \"" + determineCheckBoxVal("summaryRoutingDAPSS7", blob) + "\"; ";
                }
                proj.routing_dap_ss7 = determineCheckBoxVal("summaryRoutingDAPSS7", blob);  //(String)blob["summaryRoutingDAPSS71"]; }

                if (proj.routing_new_800_nums != determineCheckBoxVal("summaryRoutingNew800Nums", blob))
                {
                    logBuilderCheckBoxes += "Routing New #s checkbox changed: \"" + proj.routing_new_800_nums + "\" -> \"" + determineCheckBoxVal("summaryRoutingNew800Nums", blob) + "\"; ";
                }
                proj.routing_new_800_nums = determineCheckBoxVal("summaryRoutingNew800Nums", blob);  //(String)blob["summaryRoutingNew800Nums1"]; }

                if (proj.routing_redirect_800_nums != determineCheckBoxVal("summaryRoutingRedirect800Nums", blob))
                {
                    logBuilderCheckBoxes += "Routing Redirect #s checkbox changed: \"" + proj.routing_redirect_800_nums + "\" -> \"" + determineCheckBoxVal("summaryRoutingRedirect800Nums", blob) + "\"; ";
                }
                proj.routing_redirect_800_nums = determineCheckBoxVal("summaryRoutingRedirect800Nums", blob);  //(String)blob["summaryRoutingRedirect800Nums1"]; }

                if (proj.routing_remove_800_nums != determineCheckBoxVal("summaryRoutingRemove800Nums", blob))
                {
                    logBuilderCheckBoxes += "Routing Remove #s checkbox changed: \"" + proj.routing_remove_800_nums + "\" -> \"" + determineCheckBoxVal("summaryRoutingRemove800Nums", blob) + "\"; ";
                }
                proj.routing_remove_800_nums = determineCheckBoxVal("summaryRoutingRemove800Nums", blob);  //(String)blob["summaryRoutingRemove800Nums1"]; }

                if (proj.scraper != determineCheckBoxVal("summaryScraper", blob))
                {
                    logBuilderCheckBoxes += "Scraper checkbox changed: \"" + proj.scraper + "\" -> \"" + determineCheckBoxVal("summaryScraper", blob) + "\"; ";
                }
                proj.scraper = determineCheckBoxVal("summaryScraper", blob);  //(String)blob["summaryScraper1"]; }

                if (proj.service_id != determineCheckBoxVal("summaryServiceID", blob))
                {
                    logBuilderCheckBoxes += "Service ID checkbox changed: \"" + proj.service_id + "\" -> \"" + determineCheckBoxVal("summaryServiceID", blob) + "\"; ";
                }
                proj.service_id = determineCheckBoxVal("summaryServiceID", blob);  //(String)blob["summaryServiceID1"]; }

                if (proj.speech_rec != determineCheckBoxVal("summarySpeechRecognition", blob))
                {
                    logBuilderCheckBoxes += "Speech Recognition checkbox changed: \"" + proj.speech_rec + "\" -> \"" + determineCheckBoxVal("summarySpeechRecognition", blob) + "\"; ";
                }
                proj.speech_rec = determineCheckBoxVal("summarySpeechRecognition", blob);  //(String)blob["summarySpeechRecognition1"]; }

                if (proj.tnt != determineCheckBoxVal("summaryTNTFunctionality", blob))
                {
                    logBuilderCheckBoxes += "TNT Functionality checkbox changed: \"" + proj.tnt + "\" -> \"" + determineCheckBoxVal("summaryTNTFunctionality", blob) + "\"; ";
                }
                proj.tnt = determineCheckBoxVal("summaryTNTFunctionality", blob);  //(String)blob["summaryTNTFunctionality1"]; }

                if (proj.tts != determineCheckBoxVal("summaryTTSFunctionality", blob))
                {
                    logBuilderCheckBoxes += "TTS Functionality checkbox changed: \"" + proj.tts + "\" -> \"" + determineCheckBoxVal("summaryTTSFunctionality", blob) + "\"; ";
                }
                proj.tts = determineCheckBoxVal("summaryTTSFunctionality", blob);  //(String)blob["summaryTTSFunctionality1"]; }

                if (proj.tables_customer_update_load != determineCheckBoxVal("summaryTablesCustomerUpdateLoad", blob))
                {
                    logBuilderCheckBoxes += "Tables Customer Update / Customer Load checkbox changed: \"" + proj.tables_customer_update_load + "\" -> \"" + determineCheckBoxVal("summaryTablesCustomerUpdateLoad", blob) + "\"; ";
                }
                proj.tables_customer_update_load = determineCheckBoxVal("summaryTablesCustomerUpdateLoad", blob);  //(String)blob["summaryTablesCustomerUpdateLoad1"]; }

                if (proj.tables_customer_update_usan_load != determineCheckBoxVal("summaryTablesCustomerUpdateUsanLoad", blob))
                {
                    logBuilderCheckBoxes += "Tables Customer Update / USAN Load checkbox changed: \"" + proj.tables_customer_update_usan_load + "\" -> \"" + determineCheckBoxVal("summaryTablesCustomerUpdateUsanLoad", blob) + "\"; ";
                }
                proj.tables_customer_update_usan_load = determineCheckBoxVal("summaryTablesCustomerUpdateUsanLoad", blob);  //(String)blob["summaryTablesCustomerUpdateUsanLoad1"]; }

                if (proj.tables_def_file != determineCheckBoxVal("summaryTablesDefFile", blob))
                {
                    logBuilderCheckBoxes += "Tables Def File checkbox changed: \"" + proj.tables_def_file + "\" -> \"" + determineCheckBoxVal("summaryTablesDefFile", blob) + "\"; ";
                }
                proj.tables_def_file = determineCheckBoxVal("summaryTablesDefFile", blob);  //(String)blob["summaryTablesDefFile1"]; }

                if (proj.tables_metafile != determineCheckBoxVal("summaryTablesMetafile", blob))
                {
                    logBuilderCheckBoxes += "Tables Meta File checkbox changed: \"" + proj.tables_metafile + "\" -> \"" + determineCheckBoxVal("summaryTablesMetafile", blob) + "\"; ";
                }
                proj.tables_metafile = determineCheckBoxVal("summaryTablesMetafile", blob);  //(String)blob["summaryTablesMetafile1"]; }

                if (proj.tables_usan_update_load != determineCheckBoxVal("summaryTablesUsanUpdateLoad", blob))
                {
                    logBuilderCheckBoxes += "Tables USAN Update / USAN Load checkbox changed: \"" + proj.tables_usan_update_load + "\" -> \"" + determineCheckBoxVal("summaryTablesUsanUpdateLoad", blob) + "\"; ";
                }
                proj.tables_usan_update_load = determineCheckBoxVal("summaryTablesUsanUpdateLoad", blob);  //(String)blob["summaryTablesUsanUpdateLoad1"]; }

                if (proj.tables_xls_csv != determineCheckBoxVal("summaryTablesXlsCsv", blob))
                {
                    logBuilderCheckBoxes += "Tables .xls / .csv checkbox changed: \"" + proj.tables_xls_csv + "\" -> \"" + determineCheckBoxVal("summaryTablesXlsCsv", blob) + "\"; ";
                }
                proj.tables_xls_csv = determineCheckBoxVal("summaryTablesXlsCsv", blob);  //(String)blob["summaryTablesXlsCsv1"]; }

                if (proj.traffic != determineCheckBoxVal("summaryTraffic", blob))
                {
                    logBuilderCheckBoxes += "Traffic checkbox changed: \"" + proj.traffic + "\" -> \"" + determineCheckBoxVal("summaryTraffic", blob) + "\"; ";
                }
                proj.traffic = determineCheckBoxVal("summaryTraffic", blob);  //(String)blob["summaryTraffic"]; }

                if (proj.uui != determineCheckBoxVal("summaryUUI", blob))
                {
                    logBuilderCheckBoxes += "UUI checkbox changed: \"" + proj.uui + "\" -> \"" + determineCheckBoxVal("summaryUUI", blob) + "\"; ";
                }
                proj.uui = determineCheckBoxVal("summaryUUI", blob);  //(String)blob["summaryUUI1"]; }
                //radio buttons
                if (((String)blob["summaryConferenceCall"]) != null)
                {
                    if(proj.conference_call != (((String)blob["summaryConferenceCall"]) == "1" ? true : false))
                    {
                        logBuilderRadioButtons += "Conference Call radio button changed: \"" + proj.conference_call + "\" -> \"" + (((String)blob["summaryConferenceCall"]) == "1" ? true : false) + "\"; ";
                    }
                    proj.conference_call = (((String)blob["summaryConferenceCall"]) == "1" ? true : false);
                }

                if (((String)blob["summaryExpediteRadio"]) != null)
                {
                    if (proj.expedite != (((String)blob["summaryExpediteRadio"]) == "1" ? true : false))
                    {
                        logBuilderRadioButtons += "Expedite radio button changed: \"" + proj.expedite + "\" -> \"" + (((String)blob["summaryExpediteRadio"]) == "1" ? true : false) + "\"; ";
                    }
                    proj.expedite = (((String)blob["summaryExpediteRadio"]) == "1" ? true : false);
                }
                if (((String)blob["summarySoakRadio"]) != null)
                {
                    if (proj.soak != (((String)blob["summarySoakRadio"]) == "1" ? true : false))
                    {
                        logBuilderRadioButtons += "Soak radio button changed: \"" + proj.soak + "\" -> \"" + (((String)blob["summarySoakRadio"]) == "1" ? true : false) + "\"; ";
                    }
                    proj.soak = (((String)blob["summarySoakRadio"]) == "1" ? true : false);
                }
                if (((String)blob["summaryLinked"]) != null)
                {
                    if (proj.linked != (((String)blob["summaryLinked"]) == "1" ? true : false))
                    {
                        logBuilderRadioButtons += "Linked radio button changed: \"" + proj.linked + "\" -> \"" + (((String)blob["summaryLinked"]) == "1" ? true : false) + "\"; ";
                    }
                    proj.linked = (((String)blob["summaryLinked"]) == "1" ? true : false);
                }

                if (((String)blob["summaryPreApproved"]) != null)
                {
                    if (proj.preapproved != (((String)blob["summaryPreApproved"]) == "1" ? true : false))
                    {
                        logBuilderRadioButtons += "Linked radio button changed: \"" + proj.preapproved + "\" -> \"" + (((String)blob["summaryPreApproved"]) == "1" ? true : false) + "\"; ";
                    }
                    proj.preapproved = (((String)blob["summaryPreApproved"]) == "1" ? true : false);
                }
                //comboboxes
                if (blob["summaryAdditionalBusinessUnits"] != null)
                {
                    if (blob["summaryAdditionalBusinessUnits"].GetType() == typeof(JValue))
                    {
                        if (proj.additional_business_units != (String)blob["summaryAdditionalBusinessUnits"])
                        {
                            logBuilder += "Additional Business Units changed: \"" + proj.additional_business_units + "\" -> \"" + (String)blob["summaryAdditionalBusinessUnits"] + "\"; ";
                        }
                        proj.additional_business_units = (String)blob["summaryAdditionalBusinessUnits"];
                    }
                    else
                    {
                        string bizunits = (String)((JArray)blob["summaryAdditionalBusinessUnits"])[0];
                        for (int i = 1; i < ((JArray)blob["summaryAdditionalBusinessUnits"]).Count; i++)
                        {
                            bizunits = bizunits + ", " + (String)((JArray)blob["summaryAdditionalBusinessUnits"])[i];
                        }
                        if (proj.additional_business_units != bizunits)
                        {
                            logBuilder += "Additional Business Units changed: \"" + proj.additional_business_units + "\" -> \"" + bizunits + "\"; ";
                        }
                        proj.additional_business_units = bizunits;
                    }
                }
                else
                {
                    if (proj.additional_business_units != "")
                    {
                        logBuilder += "Additional Business Units changed: \"" + proj.additional_business_units + "\" -> \"\"; ";
                    }
                    proj.additional_business_units = "";
                }
                
                if (((String)blob["summaryBusinessUnit"]) != null)
                {
                    if (proj.primary_business_unit != (String)blob["summaryBusinessUnit"])
                    {
                        logBuilder += "Business Unit changed: \"" + proj.primary_business_unit + "\" -> \"" + (String)blob["summaryBusinessUnit"] + "\"; ";
                    }
                    proj.primary_business_unit = (String)blob["summaryBusinessUnit"];
                }
                else
                {
                    if (proj.primary_business_unit != "")
                    {
                        logBuilder += "Business Unit changed: \"" + proj.primary_business_unit + "\" -> \"\"; ";
                    }
                    proj.primary_business_unit = "";
                }

                


                if (((String)blob["summaryCompany"]) != null)
                {
                    if (proj.company != (String)blob["summaryCompany"])
                    {
                        logBuilder += "Company changed: \"" + proj.company + "\" -> \"" + (String)blob["summaryCompany"] + "\"; ";
                    }
                    proj.company = (String)blob["summaryCompany"];
                }
                else
                {
                    if (proj.company != "")
                    {
                        logBuilder += "Company changed: \"" + proj.company + "\" -> \"\"; ";
                    }
                    proj.company = "";
                }

                

                if (((String)blob["summaryCustomerProjectNumber"]) != null)
                {
                    if (proj.customer_project_number != (String)blob["summaryCustomerProjectNumber"])
                    {
                        logBuilder += "Customer Project Numer changed: \"" + proj.customer_project_number + "\" -> \"" + (String)blob["summaryCustomerProjectNumber"] + "\"; ";
                    }
                    proj.customer_project_number = (String)blob["summaryCustomerProjectNumber"];
                }
                else
                {
                    if (proj.customer_project_number != "")
                    {
                        logBuilder += "Customer Project Number changed: \"" + proj.customer_project_number + "\" -> \"\"; ";
                    }
                    proj.customer_project_number = "";
                }


                if (((String)blob["summaryLinkType"]) != null)
                {
                    if (proj.link_type != (String)blob["summaryLinkType"])
                    {
                        logBuilder += "Link Type changed: \"" + proj.link_type + "\" -> \"" + (String)blob["summaryLinkType"] + "\"; ";
                    }
                    proj.link_type = (String)blob["summaryLinkType"];
                }
                else
                {
                    if (proj.link_type != "")
                    {
                        logBuilder += "Link Type changed: \"" + proj.link_type + "\" -> \"\"; ";
                    }
                    proj.link_type = "";
                }

                if (((String)blob["summaryProjectFolder"]) != null)
                {
                    if (proj.project_folder != (String)blob["summaryProjectFolder"])
                    {
                        logBuilder += "Project Folder changed: \"" + proj.project_folder + "\" -> \"" + (String)blob["summaryProjectFolder"] + "\"; ";
                    }
                    proj.project_folder = (String)blob["summaryProjectFolder"];
                }
                else
                {
                    if (proj.project_folder != "")
                    {
                        logBuilder += "Project Folder changed: \"" + proj.project_folder + "\" -> \"\"; ";
                    }
                    proj.project_folder = "";
                }

                if (((String)blob["summaryProjectName"]) != null)
                {
                    if (proj.project_name != (String)blob["summaryProjectName"])
                    {
                        logBuilder += "Project Name changed: \"" + proj.project_name + "\" -> \"" + (String)blob["summaryProjectName"] + "\"; ";
                    }
                    proj.project_name = (String)blob["summaryProjectName"];
                }
                else
                {
                    if (proj.project_name != "")
                    {
                        logBuilder += "Project Name changed: \"" + proj.project_name + "\" -> \"\"; ";
                    }
                    proj.project_name = "";
                }




                if (((String)blob["summaryUpdatedSpecsRecd"]) != null)
                {
                    if (proj.updated_specs_recv != (String)blob["summaryUpdatedSpecsRecd"])
                    {
                        logBuilder += "Updated Specs Recd changed: \"" + proj.updated_specs_recv + "\" -> \"" + (String)blob["summaryUpdatedSpecsRecd"] + "\"; ";
                    }
                    proj.updated_specs_recv = (String)blob["summaryUpdatedSpecsRecd"];
                }
                else
                {
                    if (proj.updated_specs_recv != "")
                    {
                        logBuilder += "Updated Specs Recd changed: \"" + proj.updated_specs_recv + "\" -> \"\"; ";
                    }
                    proj.updated_specs_recv = "";
                }

                if (((String)blob["summaryRevisedUATDate"]) != null)
                {
                    if (proj.revised_uat_date != (String)blob["summaryRevisedUATDate"])
                    {
                        logBuilder += "Revised UAT Date changed: \"" + proj.revised_uat_date + "\" -> \"" + (String)blob["summaryRevisedUATDate"] + "\"; ";
                    }
                    proj.revised_uat_date = (String)blob["summaryRevisedUATDate"];
                }
                else
                {
                    if (proj.revised_uat_date != "")
                    {
                        logBuilder += "Revised UAT Date changed: \"" + proj.revised_uat_date + "\" -> \"\"; ";
                    }
                    proj.revised_uat_date = "";
                }

                if (((String)blob["summaryUATAcceptanceDue"]) != null)
                {
                    if (proj.uat_acceptance_due != (String)blob["summaryUATAcceptanceDue"])
                    {
                        logBuilder += "UAT Acceptance Due Date changed: \"" + proj.uat_acceptance_due + "\" -> \"" + (String)blob["summaryUATAcceptanceDue"] + "\"; ";
                    }
                    proj.uat_acceptance_due = (String)blob["summaryUATAcceptanceDue"];
                }
                else
                {
                    if (proj.uat_acceptance_due != "")
                    {
                        logBuilder += "UAT Acceptance Due Date changed: \"" + proj.uat_acceptance_due + "\" -> \"\"; ";
                    }
                    proj.uat_acceptance_due = "";
                }


                if (((String)blob["summaryQuoteLOEDueDate"]) != null)
                {
                    if (proj.quote_loe_due_date != (String)blob["summaryQuoteLOEDueDate"])
                    {
                        logBuilder += "RFQ/LOE Due Date changed: \"" + proj.quote_loe_due_date + "\" -> \"" + (String)blob["summaryQuoteLOEDueDate"] + "\"; ";
                    }
                    proj.quote_loe_due_date = (String)blob["summaryQuoteLOEDueDate"];
                }
                else
                {
                    if (proj.quote_loe_due_date != "")
                    {
                        logBuilder += "RFQ/LOE Due Date changed: \"" + proj.quote_loe_due_date + "\" -> \"\"; ";
                    }
                    proj.quote_loe_due_date = "";
                }

                if (((String)blob["summaryQuoteLOERecvDate"]) != null)
                {
                    if (proj.rfq_loe_recv_date != (String)blob["summaryQuoteLOERecvDate"])
                    {
                        logBuilder += "RFQ/LOE Rec'd Date changed: \"" + proj.rfq_loe_recv_date + "\" -> \"" + (String)blob["summaryQuoteLOERecvDate"] + "\"; ";
                    }
                    proj.rfq_loe_recv_date = (String)blob["summaryQuoteLOERecvDate"];
                }
                else
                {
                    if (proj.rfq_loe_recv_date != "")
                    {
                        logBuilder += "RFQ/LOE Rec'd Date changed: \"" + proj.rfq_loe_recv_date + "\" -> \"\"; ";
                    }
                    proj.rfq_loe_recv_date = "";
                }

                if (((String)blob["summaryRequestedProdDate"]) != null)
                {
                    if (proj.requested_prod_date != (String)blob["summaryRequestedProdDate"])
                    {
                        logBuilder += "Requested Prod Date changed: \"" + proj.requested_prod_date + "\" -> \"" + (String)blob["summaryRequestedProdDate"] + "\"; ";
                    }
                    proj.requested_prod_date = (String)blob["summaryRequestedProdDate"];
                }
                else
                {
                    if (proj.requested_prod_date != "")
                    {
                        logBuilder += "Requested Prod Date changed: \"" + proj.requested_prod_date + "\" -> \"\"; ";
                    }
                    proj.requested_prod_date = "";
                }

                if (((String)blob["summaryRequestedUatDate"]) != null)
                {
                    if (proj.requested_uat_date != (String)blob["summaryRequestedUatDate"])
                    {
                        logBuilder += "Requested UAT Date changed: \"" + proj.requested_uat_date + "\" -> \"" + (String)blob["summaryRequestedUatDate"] + "\"; ";
                    }
                    proj.requested_uat_date = (String)blob["summaryRequestedUatDate"];
                }
                else
                {
                    if (proj.requested_uat_date != "")
                    {
                        logBuilder += "Requested UAT Date changed: \"" + proj.requested_uat_date + "\" -> \"\"; ";
                    }
                    proj.requested_uat_date = "";
                }

                //ah 2-12-13
                try
                {
                    var swds = db.SWDSchedules.First(p => p.project_id == int.Parse(filter));
                    if (((String)blob["summaryScheduledUatDate"]) != null)
                    {
                        if (swds.scheduled_uat_delivery != (String)blob["summaryScheduledUatDate"])
                        {
                            logBuilder += "Scheduled UAT Date changed: \"" + swds.scheduled_uat_delivery + "\" -> \"" + (String)blob["summaryScheduledUatDate"] + "\"; ";
                        }
                        swds.scheduled_uat_delivery = (String)blob["summaryScheduledUatDate"];
                    }
                    else
                    {
                        if (swds.scheduled_uat_delivery != "")
                        {
                            logBuilder += "Requested UAT Date changed: \"" + swds.scheduled_uat_delivery + "\" -> \"\"; ";
                        }
                        swds.scheduled_uat_delivery = "";
                    }
                }
                catch (Exception)
                {
                    comment += "Error saving scheduled uat date";
                }

                //ah 2-12-13
                try
                {
                    var uatd = db.UatProdInstalls.First(p => p.project_id == int.Parse(filter));
                    if (((String)blob["summaryScheduledProdDate"]) != null)
                    {
                        if (uatd.uat_date != (String)blob["summaryScheduledProdDate"])
                        {
                            logBuilder += "Scheduled UAT Date changed: \"" + uatd.uat_date + "\" -> \"" + (String)blob["summaryScheduledProdDate"] + "\"; ";
                        }
                        uatd.uat_date = (String)blob["summaryScheduledProdDate"];
                    }
                    else
                    {
                        if (uatd.uat_date != "")
                        {
                            logBuilder += "Requested UAT Date changed: \"" + uatd.uat_date + "\" -> \"\"; ";
                        }
                        uatd.uat_date = "";
                    }
                }
                catch (Exception)
                {
                    comment += "Error saving scheduled prod date";
                }

                //ah 3-15-13
                if (((String)blob["summaryQuoteLOEIssueDate"]) != null)
                {
                    if (proj.quote_loe_issue_date != (String)blob["summaryQuoteLOEIssueDate"])
                    {
                        logBuilder += "Quote/LOE Issue Date changed: \"" + proj.quote_loe_issue_date + "\" -> \"" + (String)blob["summaryQuoteLOEIssueDate"] + "\"; ";
                    }
                    proj.quote_loe_issue_date = (String)blob["summaryQuoteLOEIssueDate"];
                }
                else
                {
                    if (proj.quote_loe_issue_date != "")
                    {
                        logBuilder += "Quote/LOE Issue Date changed: \"" + proj.quote_loe_issue_date + "\" -> \"\"; ";
                    }
                    proj.quote_loe_issue_date = "";
                }

                //ah 3-15-13
                if (((String)blob["summaryAuthDueDate"]) != null)
                {
                    if (proj.auth_due_date != (String)blob["summaryAuthDueDate"])
                    {
                        logBuilder += "Auth Due Date changed: \"" + proj.auth_due_date + "\" -> \"" + (String)blob["summaryAuthDueDate"] + "\"; ";
                    }
                    proj.auth_due_date = (String)blob["summaryAuthDueDate"];
                }
                else
                {
                    if (proj.auth_due_date != "")
                    {
                        logBuilder += "Auth Due Date changed: \"" + proj.auth_due_date + "\" -> \"\"; ";
                    }
                    proj.auth_due_date = "";
                }

                //ah 3-15-13
                if (((String)blob["summaryAuthRecvDate"]) != null)
                {
                    if (proj.auth_recv_date != (String)blob["summaryAuthRecvDate"])
                    {
                        logBuilder += "Auth Recv Date changed: \"" + proj.auth_recv_date + "\" -> \"" + (String)blob["summaryAuthRecvDate"] + "\"; ";
                    }
                    proj.auth_recv_date = (String)blob["summaryAuthRecvDate"];
                }
                else
                {
                    if (proj.auth_recv_date != "")
                    {
                        logBuilder += "Auth Recv Date changed: \"" + proj.auth_recv_date + "\" -> \"\"; ";
                    }
                    proj.auth_recv_date = "";
                }

                //ah 3-15-13
                if (((String)blob["summaryUATAcceptedDate"]) != null)
                {
                    if (proj.uat_accepted_date != (String)blob["summaryUATAcceptedDate"])
                    {
                        logBuilder += "UAT Accepted Date changed: \"" + proj.uat_accepted_date + "\" -> \"" + (String)blob["summaryUATAcceptedDate"] + "\"; ";
                    }
                    proj.uat_accepted_date = (String)blob["summaryUATAcceptedDate"];
                }
                else
                {
                    if (proj.uat_accepted_date != "")
                    {
                        logBuilder += "UAT Accepted Date changed: \"" + proj.uat_accepted_date + "\" -> \"\"; ";
                    }
                    proj.uat_accepted_date = "";
                }

                //ah 3-15-13
                if (((String)blob["summaryProdCompleteDate"]) != null)
                {
                    if (proj.prod_complete_date != (String)blob["summaryProdCompleteDate"])
                    {
                        logBuilder += "Prod Complete Date changed: \"" + proj.prod_complete_date + "\" -> \"" + (String)blob["summaryProdCompleteDate"] + "\"; ";
                    }
                    proj.prod_complete_date = (String)blob["summaryProdCompleteDate"];
                }
                else
                {
                    if (proj.prod_complete_date != "")
                    {
                        logBuilder += "Prod Complete Date changed: \"" + proj.prod_complete_date + "\" -> \"\"; ";
                    }
                    proj.prod_complete_date = "";
                }


                if (((String)blob["usanProjectDescription"]) != null)
                {
                    if (proj.description != (String)blob["usanProjectDescription"])
                    {
                        logBuilder += "Project Description changed: \"" + proj.description + "\" -> \"" + (String)blob["usanProjectDescription"] + "\"; ";
                    }
                    proj.description = (String)blob["usanProjectDescription"];
                }
                else
                {
                    if (proj.description != "")
                    {
                        logBuilder += "Project Description changed: \"" + proj.description + "\" -> \"\"; ";
                    }
                    proj.description = "";
                }

                if (((String)blob["usanProjectNextSteps"]) != null)
                {
                    if (proj.next_steps != (String)blob["usanProjectNextSteps"])
                    {
                        logBuilder += "Next Steps changed: \"" + proj.next_steps + "\" -> \"" + (String)blob["usanProjectNextSteps"] + "\"; ";
                    }
                    proj.next_steps = (String)blob["usanProjectNextSteps"];
                }
                else
                {
                    if (proj.next_steps != "")
                    {
                        logBuilder += "Next Steps changed: \"" + proj.next_steps + "\" -> \"\"; ";
                    }
                    proj.next_steps = "";
                }

                //smm (9-18-12)
                if (((String)blob["summaryProjectDependencies"]) != null)
                {
                    if (proj.project_dependencies != (String)blob["summaryProjectDependencies"])
                    {
                        logBuilder += "Project Dependencies changed: \"" + proj.project_dependencies + "\" -> \"" + (String)blob["summaryProjectDependencies"] + "\"; ";
                    }
                    proj.project_dependencies = (String)blob["summaryProjectDependencies"];
                }
                else
                {
                    if (proj.project_dependencies != "")
                    {
                        logBuilder += "Project Dependencies changed: \"" + proj.project_dependencies + "\" -> \"\"; ";
                    }
                    proj.project_dependencies = "";
                }

                if (((String)blob["usanProjectNumber"]) != null)
                {
                    if (proj.project_number != (String)blob["usanProjectNumber"])
                    {
                        logBuilder += "Project Number changed: \"" + proj.project_number + "\" -> \"" + (String)blob["usanProjectNumber"] + "\"; ";
                    }
                    proj.project_number = (String)blob["usanProjectNumber"];
                }
                else
                {
                    if (proj.project_number != "")
                    {
                        logBuilder += "Project Number changed: \"" + proj.project_number + "\" -> \"\"; ";
                    }
                    proj.project_number = "";
                }






                if (blob["summaryLinkedProjects"] != null)
                {
                    if (blob["summaryLinkedProjects"].GetType() == typeof(JValue))
                    {
                        if (proj.linked_projects != (String)blob["summaryLinkedProjects"])
                        {
                            logBuilder += "Linked Projects changed: \"" + proj.linked_projects + "\" -> \"" + (String)blob["summaryLinkedProjects"] + "\"; ";
                        }
                        proj.linked_projects = (String)blob["summaryLinkedProjects"];
                        updateLinkedProjects((String)blob["summaryLinkedProjects"], db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryLinkedProjects"]).Count > 0)
                        {
                            string projects = (String)((JArray)blob["summaryLinkedProjects"])[0];
                            for (int i = 1; i < ((JArray)blob["summaryLinkedProjects"]).Count; i++)
                            {
                                projects = projects + ", " + (String)((JArray)blob["summaryLinkedProjects"])[i];
                            }
                            if (proj.linked_projects != projects)
                            {
                                logBuilder += "Linked Projects changed: \"" + proj.linked_projects + "\" -> \"" + projects + "\"; ";
                            }
                            proj.linked_projects = projects;
                            updateLinkedProjects(projects, db, int.Parse(filter));
                        }
                    }
                }
                else
                {
                    if (proj.linked_projects != "")
                    {
                        logBuilder += "Linked Projects changed: \"" + proj.linked_projects + "\" -> \"\"; ";
                    }
                    proj.linked_projects = "";
                    updateLinkedProjects("", db, int.Parse(filter));
                }
                //db.SubmitChanges();


                //update ProjectContacts
                if (blob["summaryUsanBA"] != null)
                {
                    if (blob["summaryUsanBA"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanBA"]).Split(',');
                        processProjectContact(names, "USAN BA", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanBA"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanBA"])[0]).Split(',');
                            processProjectContact(names, "USAN BA", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanBA"]).Count];

                            for (int i = 0; i < ((JArray)blob["summaryUsanBA"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanBA"])[i];
                            }
                            processProjectContact(names, "USAN BA", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN BA", db, int.Parse(filter)); }

                if (blob["summaryUsanDevPM"] != null)
                {
                    if (blob["summaryUsanDevPM"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanDevPM"]).Split(',');
                        processProjectContact(names, "USAN Dev PM", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanDevPM"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanDevPM"])[0]).Split(',');
                            processProjectContact(names, "USAN Dev PM", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanDevPM"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanDevPM"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanDevPM"])[i];
                            }
                            processProjectContact(names, "USAN Dev PM", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN Dev PM", db, int.Parse(filter)); }

                if (blob["summaryUsanDeveloper"] != null)
                {
                    if (blob["summaryUsanDeveloper"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanDeveloper"]).Split(',');
                        processProjectContact(names, "USAN Developer", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanDeveloper"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanDeveloper"])[0]).Split(',');
                            processProjectContact(names, "USAN Developer", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanDeveloper"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanDeveloper"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanDeveloper"])[i];
                            }
                            processProjectContact(names, "USAN Developer", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN Developer", db, int.Parse(filter)); }

                if (blob["summaryUsanMIS"] != null)
                {
                    if (blob["summaryUsanMIS"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanMIS"]).Split(',');
                        processProjectContact(names, "USAN MIS", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanMIS"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanMIS"])[0]).Split(',');
                            processProjectContact(names, "USAN MIS", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanMIS"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanMIS"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanMIS"])[i];
                            }
                            processProjectContact(names, "USAN MIS", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN MIS", db, int.Parse(filter)); }

                if (blob["summaryUsanOpsPM"] != null)
                {
                    if (blob["summaryUsanOpsPM"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanOpsPM"]).Split(',');
                        processProjectContact(names, "USAN Ops PM", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanOpsPM"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanOpsPM"])[0]).Split(',');
                            processProjectContact(names, "USAN Ops PM", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanOpsPM"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanOpsPM"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanOpsPM"])[i];
                            }
                            processProjectContact(names, "USAN Ops PM", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN Ops PM", db, int.Parse(filter)); }

                if (blob["summaryUsanQA"] != null)
                {
                    if (blob["summaryUsanQA"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanQA"]).Split(',');
                        processProjectContact(names, "USAN QA", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanQA"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanQA"])[0]).Split(',');
                            processProjectContact(names, "USAN QA", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanQA"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanQA"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanQA"])[i];
                            }
                            processProjectContact(names, "USAN QA", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN QA", db, int.Parse(filter)); }

                if (blob["summaryUsanSystemsEngineer"] != null)
                {
                    if (blob["summaryUsanSystemsEngineer"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanSystemsEngineer"]).Split(',');
                        processProjectContact(names, "USAN Systems Engineer", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanSystemsEngineer"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanSystemsEngineer"])[0]).Split(',');
                            processProjectContact(names, "USAN Systems Engineer", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanSystemsEngineer"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanSystemsEngineer"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanSystemsEngineer"])[i];
                            }
                            processProjectContact(names, "USAN Systems Engineer", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN Systems Engineer", db, int.Parse(filter)); }

                if (blob["summaryUsanTC"] != null)
                {
                    if (blob["summaryUsanTC"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanTC"]).Split(',');
                        processProjectContact(names, "USAN TC", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanTC"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanTC"])[0]).Split(',');
                            processProjectContact(names, "USAN TC", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanTC"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanTC"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanTC"])[i];
                            }
                            processProjectContact(names, "USAN TC", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN TC", db, int.Parse(filter)); }

                if (blob["summaryUsanTLSIP"] != null)
                {
                    if (blob["summaryUsanTLSIP"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanTLSIP"]).Split(',');
                        processProjectContact(names, "USAN TLS-IP", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanTLSIP"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanTLSIP"])[0]).Split(',');
                            processProjectContact(names, "USAN TLS-IP", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanTLSIP"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanTLSIP"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanTLSIP"])[i];
                            }
                            processProjectContact(names, "USAN TLS-IP", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN TLS-IP", db, int.Parse(filter)); }

                if (blob["summaryUsanTLSSaaS"] != null)
                {
                    if (blob["summaryUsanTLSSaaS"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanTLSSaaS"]).Split(',');
                        processProjectContact(names, "USAN TLS-SaaS", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanTLSSaaS"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanTLSSaaS"])[0]).Split(',');
                            processProjectContact(names, "USAN TLS-SaaS", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanTLSSaaS"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanTLSSaaS"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanTLSSaaS"])[i];
                            }
                            processProjectContact(names, "USAN TLS-SaaS", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN TLS-SaaS", db, int.Parse(filter)); }


                //ah 3-15-13
                if (blob["summaryUsanOSG"] != null)
                {
                    if (blob["summaryUsanOSG"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanOSG"]).Split(',');
                        processProjectContact(names, "USAN OSG", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanOSG"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanOSG"])[0]).Split(',');
                            processProjectContact(names, "USAN OSG", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanOSG"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanOSG"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanOSG"])[i];
                            }
                            processProjectContact(names, "USAN OSG", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN OSG", db, int.Parse(filter)); }

                //ah 3-15-13
                if (blob["summaryUsanNetworkOps"] != null)
                {
                    if (blob["summaryUsanNetworkOps"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryUsanNetworkOps"]).Split(',');
                        processProjectContact(names, "USAN Network Ops", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryUsanNetworkOps"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryUsanNetworkOps"])[0]).Split(',');
                            processProjectContact(names, "USAN Network Ops", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryUsanNetworkOps"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryUsanNetworkOps"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryUsanNetworkOps"])[i];
                            }
                            processProjectContact(names, "USAN Network Ops", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("USAN Network Ops", db, int.Parse(filter)); }

                if (blob["summaryCustomerHost"] != null)
                {
                    if (blob["summaryCustomerHost"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryCustomerHost"]).Split(',');
                        processProjectContact(names, "Customer Host", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryCustomerHost"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryCustomerHost"])[0]).Split(',');
                            processProjectContact(names, "Customer Host", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryCustomerHost"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryCustomerHost"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryCustomerHost"])[i];
                            }
                            processProjectContact(names, "Customer Host", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("Customer Host", db, int.Parse(filter)); }

                if (blob["summaryCustomerPM"] != null)
                {
                    if (blob["summaryCustomerPM"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryCustomerPM"]).Split(',');
                        processProjectContact(names, "Customer PM", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryCustomerPM"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryCustomerPM"])[0]).Split(',');
                            processProjectContact(names, "Customer PM", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryCustomerPM"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryCustomerPM"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryCustomerPM"])[i];
                            }
                            processProjectContact(names, "Customer PM", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("Customer PM", db, int.Parse(filter)); }

                if (blob["summaryCustomerRFQ"] != null)
                {
                    if (blob["summaryCustomerRFQ"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryCustomerRFQ"]).Split(',');
                        processProjectContact(names, "Customer RFQ", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryCustomerRFQ"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryCustomerRFQ"])[0]).Split(',');
                            processProjectContact(names, "Customer RFQ", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryCustomerRFQ"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryCustomerRFQ"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryCustomerRFQ"])[i];
                            }
                            processProjectContact(names, "Customer RFQ", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("Customer RFQ", db, int.Parse(filter)); }

                if (blob["summaryCustomerTC"] != null)
                {
                    if (blob["summaryCustomerTC"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryCustomerTC"]).Split(',');
                        processProjectContact(names, "Customer TC", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryCustomerTC"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryCustomerTC"])[0]).Split(',');
                            processProjectContact(names, "Customer TC", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryCustomerTC"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryCustomerTC"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryCustomerTC"])[i];
                            }
                            processProjectContact(names, "Customer TC", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("Customer TC", db, int.Parse(filter)); }

                if (blob["summaryCustomerTesting"] != null)
                {
                    if (blob["summaryCustomerTesting"].GetType() == typeof(JValue))
                    {
                        string[] names = ((String)blob["summaryCustomerTesting"]).Split(',');
                        processProjectContact(names, "Customer Testing", db, int.Parse(filter));
                    }
                    else
                    {
                        if (((JArray)blob["summaryCustomerTesting"]).Count == 1)
                        {
                            string[] names = ((String)((JArray)blob["summaryCustomerTesting"])[0]).Split(',');
                            processProjectContact(names, "Customer Testing", db, int.Parse(filter));
                        }
                        else
                        {
                            string[] names = new string[((JArray)blob["summaryCustomerTesting"]).Count];
                            for (int i = 0; i < ((JArray)blob["summaryCustomerTesting"]).Count; i++)
                            {
                                names[i] = (String)((JArray)blob["summaryCustomerTesting"])[i];
                            }
                            processProjectContact(names, "Customer Testing", db, int.Parse(filter));
                        }
                    }
                }
                else { deleteProjectContact("Customer Testing", db, int.Parse(filter)); }
                
                db.SubmitChanges();
                
                //if (permission != "PM")
                //{
                    if (logBuilderCheckBoxes != "")
                    {
                        logBuilderCheckBoxes = logBuilderCheckBoxes.Replace("0", "(none selected)");
                        logBuilderCheckBoxes = logBuilderCheckBoxes.Replace("1", "Existing");
                        logBuilderCheckBoxes = logBuilderCheckBoxes.Replace("2", "New");
                        logBuilderCheckBoxes = logBuilderCheckBoxes.Replace("3", "Existing/New");
                    }
                    if (logBuilderRadioButtons != "")
                    {
                        logBuilderRadioButtons = logBuilderRadioButtons.Replace("False", "No");
                        logBuilderRadioButtons = logBuilderRadioButtons.Replace("True", "Yes");
                    }
                    if ((intro.Length + logBuilder.Length + logBuilderCheckBoxes.Length + logBuilderRadioButtons.Length) > 2000)
                    {
                        intro = (intro + logBuilder + logBuilderCheckBoxes + logBuilderRadioButtons);
                        intro = intro.Substring(0, 1999); //only submit first 1999 chars so that we don't exceed table's varchar limit - incredibly unlikely
                    }
                    else
                    {
                        intro = (intro + logBuilder + logBuilderCheckBoxes + logBuilderRadioButtons);
                        intro = intro.Trim();
                        if (intro.LastIndexOf(";") == intro.Length - 1)
                        {
                            intro = intro.Substring(0, intro.Length - 1);
                        }
                    }
                    ChangeLog newLog = new ChangeLog();
                    newLog.project_id = Convert.ToInt32(filter);
                    newLog.time = DateTime.Now.ToShortTimeString();
                    newLog.date = DateTime.Now.ToShortDateString();
                    newLog.tab = "Summary";
                    newLog.user_name = username;
                    newLog.description = intro;
                    if ((!db.ChangeLogs.Contains(newLog)) && (logBuilder.Length != 0 || logBuilderCheckBoxes.Length != 0 || logBuilderRadioButtons.Length != 0))
                    {
                        db.ChangeLogs.InsertOnSubmit(newLog);
                        db.SubmitChanges();
                    }
                //}
                    if (gridNeedsRefresh != "")
                    {
                        return new PagedData("Summary Page Saved Normally: " + gridNeedsRefresh + "~~" + comment); //+ intro + logBuilder + logBuilderCheckBoxes + logBuilderRadioButtons);  //proj);
                    }
                    else
                    {
                        return new PagedData("Summary Page Saved Normally: " + comment); //+ intro + logBuilder + logBuilderCheckBoxes + logBuilderRadioButtons);  //proj);
                    }

            }
            else
            {
                //this is a new project
                return new PagedData("New Project functionality not implemented yet");
            }

        }

        public string determineCheckBoxVal(string cboxName, JObject blob)
        {
            if ((String)blob[cboxName + "1"] != null && (String)blob[cboxName + "2"] != null)
                return "3";
            else if ((String)blob[cboxName + "2"] != null)
                return "2";
            else if ((String)blob[cboxName + "1"] != null)
                return "1";
            else
                return "0";
        }

        public void processProjectContact(string[] names, string projectContactType, CookDBDataContext db, int project_id)
        {
            try
            {
                //check if there are existing contacts for this type; and if so, wipe them out
                IQueryable<ProjectContact> q = db.ProjectContacts;
                q.Where(a => a.project_id.Equals(project_id) && a.type.Equals(projectContactType));
                List<ProjectContact> oldRecs = new List<ProjectContact>();
                List<ProjectContact> newRecs = new List<ProjectContact>();
                Boolean shouldWeDelete = false;
                int count = db.ProjectContacts.Count(a => a.project_id.Equals(project_id) && a.type.Equals(projectContactType));
                if (count > 0)
                {
                    shouldWeDelete = true;
                    var result = db.ProjectContacts.Where(a => a.project_id.Equals(project_id) && a.type.Equals(projectContactType));
                    oldRecs = db.ProjectContacts.Where(a => a.project_id.Equals(project_id) && a.type.Equals(projectContactType)).ToList();
                    //db.ProjectContacts.DeleteAllOnSubmit(result);
                    //db.SubmitChanges();
                }

                foreach (string name in names)
                {
                    string realName = name.Trim();
                    int contact_id = (db.Contacts.Single(a => a.name.Equals(realName))).contact_id;
                    //if (db.ProjectContacts.Count(a => a.contact_id.Equals(contact_id) && a.type.Equals(projectContactType) && a.project_id.Equals(project_id)) == 0)
                    //{
                    //add the contact to the project
                    ProjectContact contact = new ProjectContact();
                    contact.Contact = db.Contacts.Single(a => a.contact_id.Equals(contact_id));
                    contact.ProjectInformation = db.ProjectInformations.Single(a => a.project_id.Equals(project_id));
                    contact.type = projectContactType;
                    newRecs.Add(contact);

                    db.ProjectContacts.InsertOnSubmit(contact);
                    //}
                }
                bool matched = true;
                if (oldRecs.Count().Equals(newRecs.Count()) && oldRecs.Count() > 0)
                {
                    try
                    {
                        oldRecs = oldRecs.OrderBy(a => a.contact_id).ToList();
                        newRecs = newRecs.OrderBy(a => a.contact_id).ToList();
                    }
                    catch (Exception e)
                    {
                        comment += "sorting exception " + e.Message;
                    }
                    for (int i = 0; i < oldRecs.Count(); i++)
                    {
                        if ((oldRecs[i].contact_id != newRecs[i].contact_id) || (oldRecs[i].type != newRecs[i].type))
                        {
                            matched = false;
                        }
                        /*try
                        {
                            comment += "[Testing: " + oldRecs[i].Contact.name + "|"+oldRecs[i].contact_id + "|" + i + "/" + oldRecs.Count()+"]";
                        }
                        catch (Exception e)
                        {
                            comment += "[Yep " + e.Message + "]";
                        }*/
                    }
                }
                else
                {
                    matched = false;
                }
                if (matched != true)
                {
                    comment += "[Testing: " + oldRecs.Count() + "|" + newRecs.Count() + "]";
                    string a = "", b = "";
                    foreach (ProjectContact c in oldRecs)
                    {
                        a += c.Contact.name + ", ";
                    }
                    if (a.LastIndexOf(", ") == a.Length - 2)
                    {
                        a = a.Substring(0, a.Length - 2);
                    }
                    foreach (ProjectContact d in newRecs)
                    {
                        b += d.Contact.name + ", ";
                    }
                    if (b.LastIndexOf(", ") == b.Length - 2)
                    {
                        b = b.Substring(0, b.Length - 2);
                    }
                    logBuilder += projectContactType + " has changed from: \"" + a + "\" -> \"" + b + "\"; ";
                }
                if (shouldWeDelete != false)
                {
                    var result = db.ProjectContacts.Where(a => a.project_id.Equals(project_id) && a.type.Equals(projectContactType));
                    db.ProjectContacts.DeleteAllOnSubmit(result);
                    db.SubmitChanges();
                }

            }
            catch (Exception e)
            {
                comment += "[something went wrong in processContacts|"+e.Message +"]";
            }
        }

        public void deleteProjectContact(string projectContactType, CookDBDataContext db, int project_id)
        {
            int count = db.ProjectContacts.Count(a => a.project_id.Equals(project_id) && a.type.Equals(projectContactType));
            if (count > 0)
            {
                var result = db.ProjectContacts.Where(a => a.project_id.Equals(project_id) && a.type.Equals(projectContactType));
                db.ProjectContacts.DeleteAllOnSubmit(result);
                db.SubmitChanges();
            }           
        }

        public void updateLinkedProjects(String projects, CookDBDataContext db, int project_id)
        {
            try
            {
                if (projects == "")
                {
                    if (db.LinkedProjects.Count(a => a.project_id.Equals(project_id)) > 0)
                    {
                        var wiping = db.LinkedProjects.Where(a => a.project_id.Equals(project_id));
                        db.LinkedProjects.DeleteAllOnSubmit(wiping);
                        db.SubmitChanges();
                    }
                }
                else
                {
                    //parse each project, and if that project is found, create an entry where THIS project = project_id and projects passed are sub_proj_id's
                    var brokenUpProjects = projects.Split(',');

                    var wiping = db.LinkedProjects.Where(a => a.project_id.Equals(project_id));
                    db.LinkedProjects.DeleteAllOnSubmit(wiping);
                    db.SubmitChanges();

                    foreach (String i in brokenUpProjects)
                    {
                        if (i.Trim() != "")
                        {
                            if (db.ProjectInformations.Count(a => a.project_number.Equals(i.Trim())) > 0)
                            {
                                try
                                {
                                    LinkedProject lp = new LinkedProject();
                                    lp.project_id = project_id;
                                    lp.sub_project_id = db.ProjectInformations.First(a => a.project_number.Equals(i.Trim())).project_id;
                                    if (!db.LinkedProjects.Contains(lp) && lp.sub_project_id != lp.project_id)
                                    {
                                        db.LinkedProjects.InsertOnSubmit(lp);
                                        db.SubmitChanges();
                                    }
                                }
                                catch (Exception)
                                {
                                    //in case of (probably non-existant) wierd error where the proj number is found but doesnt have a proj id...ignore
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                comment += "Linked projects did not save correctly " + e.HelpLink + e.Message + e.TargetSite;
            }
        }

    }
}