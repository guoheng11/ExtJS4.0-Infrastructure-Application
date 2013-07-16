Ext.define('CookBook.model.BackofficeDBRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'backofficedb_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'sql_file', 'notes', 'instructions']
});