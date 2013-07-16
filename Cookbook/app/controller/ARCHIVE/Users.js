Ext.define('CookBook.controller.Users', {
    extend: 'Ext.app.Controller',

	stores: [
		'Users'
	],

	models: ['User'],

	views: [
		'user.List',
		'user.Edit'
	],


    init: function() {
        this.control({
			'userlist': {
				itemdblclick: this.editUser
			},
			'useredit button[action=save]': {
				click: this.updateUser
			}
		});

		var store = this.getStore('Users');
		var proxy = store.getProxy();
		proxy.on('exception', this.onException);
    },

	editUser: function(grid, record) {
		var view = Ext.widget('useredit');

		view.down('form').loadRecord(record);
	},

	updateUser: function(button) {
		
		var win = button.up('window'),
			form = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();

		record.set(values);
		win.close();

		this.getUsersStore().getProxy().on('exception', this.onException);
		this.getUsersStore().sync();
		
	},

	onException: function(proxy, response, operation, eOpts) {
		console.log("hello?!");
		console.log(response.responseText);
	}
});