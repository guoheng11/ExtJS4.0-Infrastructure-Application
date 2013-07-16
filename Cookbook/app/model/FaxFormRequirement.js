Ext.define('CookBook.model.FaxFormRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'fax_form_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'filename', 'instructions', 'notes']
});