Ext.define('CookBook.model.TrafficRoutingAddDnis', {
	extend: 'Ext.data.Model',
	fields: ['routing_requirements_id','project_id','dnis','route_to','platform','description',{name:'usan_date'/*, type:'date', dateFormat:'c'*/},{name:'usan_time'/*, type:'date', dateFormat:'c'*/},{name:'dnis_date'/*, type:'date', dateFormat:'c'*/},{name:'dnis_time'/*, type:'date', dateFormat:'c'*/},{name:'carrier_date'/*, type:'date', dateFormat:'c'*/},{name:'carrier_time'/*, type:'date', dateFormat:'c'*/},'alias', 'type']
});