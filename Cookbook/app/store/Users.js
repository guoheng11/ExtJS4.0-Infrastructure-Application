Ext.define('CookBook.store.Users', {
	extend: 'Ext.data.Store',
	model: 'CookBook.model.User',
	//data: [
		//{name: 'Wu', email: 'hooha@whawha.com'},
		//{name: 'Li', email: 'weehe@hwachu.com'}
	//]
	autoLoad: false,
	
	proxy: {
		type: 'ajax',

		actionMethods: {
			update: 'PUT',
			read: 'GET',
			destroy: 'DELETE',
			create: 'POST'
		},

		api: {
			read:  'data/users.json',
			update: 'data/updateUsers.json'
		},
		
		url: 'data/updateUsers.json',
		
		//noCache: false,
		reader: {
			type: 'json',
			root: 'users',
			successProperty: 'success'
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