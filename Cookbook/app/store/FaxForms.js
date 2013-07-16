Ext.define('CookBook.store.FaxForms', {
	extend: 'Ext.data.Store',
	model: 'CookBook.model.FaxForm',
	
	autoLoad: false,
	
	proxy: {
		type: 'ajax',

		actionMethods: {
			update: 'PUT',
			read: 'GET',
			destroy: 'DELETE',
			create: 'POST'
		},
		
		url: 'GetFaxForms.ashx',
		limitParam: 'undefined',
		
		//noCache: false,
		reader: {
			type: 'json',
			root: 'rows',
			totalProperty: 'total',
			successProperty: 'success',
			id: 'fax_form_id'
		},

		afterRequest: function(request, success) {/*
            console.log(request.action);
            console.log(request.method);
            console.log(request.params);
            console.log(request.url);
            console.log('Succeeded? Actually ' + success);*/
        }
	}
});