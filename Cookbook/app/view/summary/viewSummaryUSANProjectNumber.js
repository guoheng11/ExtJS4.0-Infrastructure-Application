Ext.define('CookBook.view.summary.ViewSummaryUSANProjectNumber', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryUSANProjectNumber',

	//options
	allowBlank: false,
	fieldLabel: 'USAN Project Number',
	labelAlign: 'left',
	regex: new RegExp("\\D+-\\d+"),  //e.g. AHFC-123

	name: 'usanProjectNumber',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter the project number, e.g. AHFC-123'
			});
		}
	}
});