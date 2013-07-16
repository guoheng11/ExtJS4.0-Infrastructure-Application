Ext.define('CookBook.model.TrafficRoutingRemoveDnis', {
	extend: 'Ext.data.Model',
	fields: ['routing_requirements_id', 'project_id', 'dnis', 'description', 'remove_from', 'platform', {name:'usan_date'/*, type:'date', dateFormat:'c'*/}, {name:'usan_time'/*, type:'date', dateFormat:'c'*/}, 'type']
});