Ext.define('CookBook.model.SWDSchedule', {
    extend: 'Ext.data.Model',
    fields: ['scheduled_vendor_start', 'scheduled_vendor_complete', 'actual_vendor_complete','scheduled_docs_to_customer','project_id',
    'actual_docs_to_customer', 'scheduled_docs_approval', 'actual_docs_approval', 'scheduled_tls_start',
    'scheduled_tls_complete', 'actual_tls_complete', 'scheduled_uat_delivery', 'actual_uat_delivery', 'comments', 'scheduled_systems_start',
    'scheduled_systems_complete', 'actual_systems_complete', 'actual_dev_complete', 'actual_qa_complete', 'target_scripts_ordered',
    'target_scripts_delivered', 'actual_scripts_loaded', 'actual_ba_complete', 'scheduled_ba_start', 'scheduled_ba_complete',
    'tls_comments', 'systems_comments', 'billable_pm_hours', 'target_production_date', 'actual_production_date', 'access_usan_comments', 
	'qa_comments', 'net_ops_comments', 'scheduled_dev_start', 'scheduled_dev_complete']
});