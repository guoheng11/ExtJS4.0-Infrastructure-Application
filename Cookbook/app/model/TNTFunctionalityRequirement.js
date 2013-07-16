Ext.define('CookBook.model.TNTFunctionalityRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'tnt_functionality_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'call_volume', 'notes']
});