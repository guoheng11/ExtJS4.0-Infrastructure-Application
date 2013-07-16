Ext.define('CookBook.model.UUIRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'uui_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'call_volume', 'notes']
});