Ext.define('CookBook.store.ProjectAssumptions', {
	extend: 'Ext.data.Store',
	model: 'CookBook.model.ProjectAssumption',
	
	autoLoad: false,
	
	proxy: {
		type: 'ajax',

		actionMethods: {
			update: 'PUT',
			read: 'GET',
			destroy: 'DELETE',
			create: 'POST'
		},
		
		url: 'GetProjectAssumptions.ashx',
		limitParam: 'undefined',
		
		//noCache: false,
		reader: {
			type: 'json',
			root: 'rows',
			totalProperty: 'total',
			successProperty: 'success',
			idProperty: 'project_assumptions_id'
		},

		writer: {
			type: 'json',
			root: 'rows',
			totalProperty: 'total',
			successProperty: 'success',
			idProperty: 'project_assumptions_id'
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