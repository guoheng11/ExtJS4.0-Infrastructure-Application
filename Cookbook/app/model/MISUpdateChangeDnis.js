Ext.define('CookBook.model.MISUpdateChangeDnis', {
	extend: 'Ext.data.Model',
	fields: ['mis_updatednis_id', 'mis_update_id', 'dnis', 'reroute_to', 'platform', 'description', 'remove_from', 'platform_from', {name:'effective_date'/*, type:'date', dateFormat:'c'*/}]
});