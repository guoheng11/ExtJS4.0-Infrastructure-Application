Ext.define('CookBook.view.summary.ViewSummaryButtonUAT', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryButtonUAT',

	//options
	allowBlank: false,
	fieldLabel: 'UAT',
	labelAlign: 'right',
	value: '',
	//html:  '<a href=file://///ops1/e_drive target=_blank> Click me! </a>',

	name: 'summaryButtonUAT',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter a Button link, or double-click to follow the existing link'
			});
		}
	}
});