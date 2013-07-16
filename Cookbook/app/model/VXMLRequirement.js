Ext.define('CookBook.model.VXMLRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'vxmlreq_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'filename', 'description', 'notes']
});