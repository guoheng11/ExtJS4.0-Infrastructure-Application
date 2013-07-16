Ext.define('CookBook.store.ProjectDeliverables', {
	extend: 'Ext.data.Store',
	model: 'CookBook.model.ProjectDeliverable',
	
	autoLoad: false,
	
	proxy: {
		type: 'ajax',

		actionMethods: {
			update: 'PUT',
			read: 'GET',
			destroy: 'DELETE',
			create: 'POST'
		},
		
		url: 'GetProjectDeliverables.ashx',
		limitParam: 'undefined',
		
		//noCache: false,
		reader: {
			type: 'json',
			root: 'rows',
			totalProperty: 'total',
			successProperty: 'success',
			idProperty: 'project_deliverable_id'
		},

		writer: {
			type: 'json',
			root: 'rows',
			totalProperty: 'total',
			successProperty: 'success',
			idProperty: 'project_deliverable_id'
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