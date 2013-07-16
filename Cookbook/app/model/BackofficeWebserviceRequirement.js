Ext.define('CookBook.model.BackofficeWebserviceRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'backoffice_webservice_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'war_file', 'tar_file', 'notes']
});