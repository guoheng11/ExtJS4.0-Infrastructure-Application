Ext.define('CookBook.view.misupdates.ViewMISUpdatesDistributionAddEmail', {
	extend: 'Ext.form.field.TextArea',
	alias:  'widget.viewMISUpdatesDistributionAddEmail',

	//options
	allowBlank: false,
	fieldLabel: 'Emails to Add',
	labelAlign: 'top',
	value: '',

	name: 'misupdatesDistributionAddEmail'
	
	/*
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter email addresses to remove from the distribution, separated by commas'
			});
		}
	}
	*/
});