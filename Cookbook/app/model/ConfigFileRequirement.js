Ext.define('CookBook.model.ConfigFileRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'config_file_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'filename', 'instructions', 'notes']
});