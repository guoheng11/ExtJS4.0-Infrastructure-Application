using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetProjectInformation
    /// </summary>
    public class GetProjectInformation : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectInformation> q = db.ProjectInformations;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
                IQueryable<SWDSchedule> k = db.SWDSchedules;

                string scheduled_uat_date = "";

                try
                {
                    if (k.Count(a => a.project_id == int.Parse(filter)) > 0)
                    {
                        scheduled_uat_date = k.First(a => a.project_id == int.Parse(filter)).scheduled_uat_delivery;
                    }
                    else
                    {
                        scheduled_uat_date = "";
                    }
                }
                catch (Exception)
                {
                    scheduled_uat_date = "";
                }
                IQueryable<UatProdInstall> l = db.UatProdInstalls;

                string scheduled_prod_date = "";
                try
                {
                    if (l.Count(a => a.project_id == int.Parse(filter)) > 0)
                    {
                        scheduled_prod_date = l.First(a => a.project_id == int.Parse(filter)).uat_date;
                    }
                    else
                    {
                        scheduled_prod_date = "";
                    }
                }
                catch (Exception)
                {
                    scheduled_prod_date = "";
                }


                return new PagedData(q.Select(a => new { a.project_id, a.project_number, a.project_name, a.customer_project_number, a.company, a.primary_business_unit, 
                a.additional_business_units, a.rfq_loe_recv_date, a.quote_loe_due_date, a.requested_uat_date, a.requested_prod_date, a.expedite, a.preapproved, a.conference_call, a.linked, a.link_type,
                a.description, a.project_folder, a.button_uat, a.button_prod, a.access_usan, a.visio_drop, a.project_notes, a.doc_visio, a.doc_vui,
                a.doc_other, a.application, a.parm, a.reporting_button, a.reporting_vision, a.reporting_other, a.tables_xls_csv, a.tables_metafile,
                a.tables_def_file, a.tables_usan_update_load, a.tables_customer_update_usan_load, a.tables_customer_update_load, a.prompts_standard,
                a.prompts_nlu, a.routing_new_800_nums, a.routing_remove_800_nums, a.routing_redirect_800_nums, a.routing_dap_ss7, a.traffic,
                a.scraper, a.new_tran_type, a.engine, a.grammars_standard, a.grammars_vxml, a.backoffice_db, a.backoffice_process, a.backoffice_webservices,
                a.network_file_transfer, a.network_infrastructure, a.host_connectivity, a.host_wsdl, a.tnt, a.tts, a.speech_rec, a.uui, a.readi800,
                a.access_usan_user_access, a.nuance_development, a.nuance_ndm, a.service_id, a.biso_approval, a.other, a.linked_projects, a.project_dependencies, scheduled_uat_date, scheduled_prod_date,
                a.quote_loe_issue_date, a.auth_due_date, a.auth_recv_date, a.uat_accepted_date, a.prod_complete_date, a.current_project_status, a.doc_decommission, a.application_decommission, a.parm_decommission,
                a.reporting_decommission, a.tables_decommission, a.next_steps, a.updated_specs_recv, a.revised_uat_date, a.uat_acceptance_due, a.soak}));
            }
            else {
                return new PagedData(q.Select(a => new { a.project_id, a.project_number, a.project_name, a.customer_project_number, a.company, a.primary_business_unit, 
                a.additional_business_units, a.rfq_loe_recv_date, a.quote_loe_due_date, a.requested_uat_date, a.requested_prod_date, a.expedite, a.preapproved, a.conference_call, a.linked, a.link_type,
                a.description, a.project_folder, a.button_uat, a.button_prod, a.access_usan, a.visio_drop, a.project_notes, a.doc_visio, a.doc_vui,
                a.doc_other, a.application, a.parm, a.reporting_button, a.reporting_vision, a.reporting_other, a.tables_xls_csv, a.tables_metafile,
                a.tables_def_file, a.tables_usan_update_load, a.tables_customer_update_usan_load, a.tables_customer_update_load, a.prompts_standard,
                a.prompts_nlu, a.routing_new_800_nums, a.routing_remove_800_nums, a.routing_redirect_800_nums, a.routing_dap_ss7, a.traffic,
                a.scraper, a.new_tran_type, a.engine, a.grammars_standard, a.grammars_vxml, a.backoffice_db, a.backoffice_process, a.backoffice_webservices,
                a.network_file_transfer, a.network_infrastructure, a.host_connectivity, a.host_wsdl, a.tnt, a.tts, a.speech_rec, a.uui, a.readi800,
                a.access_usan_user_access, a.nuance_development, a.nuance_ndm, a.service_id, a.biso_approval, a.other, a.linked_projects, a.project_dependencies, a.quote_loe_issue_date,
                a.auth_due_date, a.auth_recv_date, a.uat_accepted_date, a.prod_complete_date, a.current_project_status, a.doc_decommission, a.application_decommission, a.parm_decommission,
                a.reporting_decommission, a.tables_decommission, a.next_steps, a.updated_specs_recv, a.revised_uat_date, a.uat_acceptance_due, a.soak}));
            }
        }
    }
}