Ext.define('CookBook.view.summary.ViewSummaryCustomerProjectNumber', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryCustomerProjectNumber',

	//options
	allowBlank: false,
	fieldLabel: 'Customer Project Number',
	labelAlign: 'left',

	name: 'summaryCustomerProjectNumber',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter the customer project number'
			});
		}
	}
});