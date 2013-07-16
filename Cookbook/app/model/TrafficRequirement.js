Ext.define('CookBook.model.TrafficRequirement', {
	extend: 'Ext.data.Model',
	fields: ['traffic_requirements_id', 'forecast', 'min_month', 'calls_month', 'busy_hour_calls', 'busy_hour_call_percentage', 'avg_call_duration']
});