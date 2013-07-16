Ext.define('CookBook.model.EngineRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'engine_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'exe_file', 'pdb_file', 'notes']
});