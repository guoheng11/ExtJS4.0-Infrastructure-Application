Ext.define('CookBook.model.OtherRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'other_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'misc', 'notes']
});