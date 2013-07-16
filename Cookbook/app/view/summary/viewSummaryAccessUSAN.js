Ext.define('CookBook.view.summary.ViewSummaryAccessUSAN', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryAccessUSAN',

	//options
	allowBlank: false,
	fieldLabel: 'AccessUSAN',
	labelAlign: 'left',
	value: '',
	//html:  '<a href=file://///ops1/e_drive target=_blank> Click me! </a>',

	name: 'summaryAccessUSAN',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter the link for AccessUSAN, or double-click to follow the existing link'
			});
		}
	}
});