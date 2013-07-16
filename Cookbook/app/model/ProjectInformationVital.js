Ext.define('CookBook.model.ProjectInformationVital', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'project_id',
        type: 'int'
    }, 'project_number', 'project_name', 'rfq_loe_recv_date', 'prod_complete_date', 'scheduled_production_date', 'scheduled_uat_delivery', 'project_status']
});
