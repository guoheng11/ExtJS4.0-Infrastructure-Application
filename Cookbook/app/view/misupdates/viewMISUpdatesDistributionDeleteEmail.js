Ext.define('CookBook.view.misupdates.ViewMISUpdatesDistributionDeleteEmail', {
	extend: 'Ext.form.field.TextArea',
	alias:  'widget.viewMISUpdatesDistributionDeleteEmail',

	//options
	allowBlank: false,
	fieldLabel: 'Emails to Delete',
	labelAlign: 'top',
	value: '',

	name: 'misupdatesDistributionDeleteEmail'
	
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