Ext.define('CookBook.model.DocumentationRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'documentation_req_id', type: 'int', useNull:true}, 'project_id', 'filename', 'latest_version', 'uat_version', 'prod_version', 'notes']
});