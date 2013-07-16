Ext.define('CookBook.store.TrafficRoutingAddDnises', {
	extend: 'Ext.data.Store',
	model: 'CookBook.model.TrafficRoutingAddDnis',

	autoLoad: false,
	
	proxy: {
		type: 'ajax',

		actionMethods: {
			update: 'PUT',
			read: 'GET',
			destroy: 'DELETE',
			create: 'POST'
		},
		
		url: 'UpdateTrafficRequirementAddDnises.ashx',
		limitParam: 'undefined',
		
		//noCache: false,
		
		reader: {
			type: 'json',
			root: 'rows',
			totalProperty: 'total',
			successProperty: 'success',
			idProperty: 'routing_requirements_id'
		},

		writer: {
			type: 'json',
			root: 'rows',
			totalProperty: 'total',
			successProperty: 'success',
			idProperty: 'routing_requirements_id'
		}
	},

	listeners: {
		datachanged: function (store, opts) {
			store.sync();
		},
		update: function (store, record, operation, opts) {
			store.sync();
		}
	}
});