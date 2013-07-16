Ext.define('CookBook.model.MISUpdateRemoveDnis', {
	extend: 'Ext.data.Model',
	fields: ['mis_updatednis_id', 'mis_update_id', 'dnis', 'description', 'remove_from', 'platform', {name:'effective_date'/*, type:'date', dateFormat:'c'*/}]
});