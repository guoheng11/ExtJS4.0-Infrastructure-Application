Ext.define('CookBook.model.GrammarRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'grammar_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'filename', 'notes']
});