Ext.define('CookBook.view.summary.ViewSummaryVisioDrop', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryVisioDrop',

	//options
	allowBlank: false,
	fieldLabel: 'Visio Drop',
	labelAlign: 'left',
	value: '',
	//html:  '<a href=file://///ops1/e_drive target=_blank> Click me! </a>',

	name: 'summaryVisioDrop',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter a link to the visios, or double-click to follow the existing link'
			});
		}
	}
});