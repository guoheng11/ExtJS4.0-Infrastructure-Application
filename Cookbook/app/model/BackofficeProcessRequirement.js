Ext.define('CookBook.model.BackofficeProcessRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'backoffice_process_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'exe_file', 'config_file', 'notes', 'instructions']
});