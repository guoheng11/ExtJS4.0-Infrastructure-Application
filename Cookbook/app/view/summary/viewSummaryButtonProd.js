Ext.define('CookBook.view.summary.ViewSummaryButtonProd', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryButtonProd',

	//options
	allowBlank: false,
	fieldLabel: 'Prod',
	labelAlign: 'right',
	value: '',
	//html:  '<a href=file://///ops1/e_drive target=_blank> Click me! </a>',

	name: 'summaryButtonProd',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter a Button link, or double-click to follow the existing link'
			});
		}
	}
});