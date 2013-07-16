Ext.define('CookBook.model.RoutingRequirement', {
	extend: 'Ext.data.Model',
	fields: ['routing_requirements_id', 'project_id', 'dnis', 'route_to', 'platform', 'description', 'remove_from', 
		     'platform_from', 'usan_date', 'usan_time', 'dnis_date', 'dnis_time', 'carrier_date', 'carrier_time', 'alias']
});