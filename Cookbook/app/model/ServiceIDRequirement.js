Ext.define('CookBook.model.ServiceIDRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'serviceid_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'product', 'service_id', 'name', 'notes']
});