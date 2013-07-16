Ext.define('CookBook.model.ProjectHistory', {
	extend: 'Ext.data.Model',
	fields: ['project_history_id', 'project_id', 'description', {name:'date', type:'date', dateFormat:'c'}, 'user_name']
});