Ext.define('CookBook.model.ApplicationRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'application_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'app_file', 'rpt_file', 'prm_file', 'prm_instructions', 'notes']
});