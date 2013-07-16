Ext.define('CookBook.model.RequirementsTabRouting', {
	extend: 'Ext.data.Model',
	fields: [{name: 'reqtab_routing_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'description', 'notes']
});