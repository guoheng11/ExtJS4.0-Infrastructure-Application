Ext.define('CookBook.view.summary.ViewSummaryProjectStatus', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryProjectStatus',

	//options
	allowBlank: true,
	readOnly: true,
	fieldLabel: 'Current Project Status',
	labelAlign: 'left',

	name: 'summaryProjectStatus',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'This is the project\'s current status'
			});
		}
	}
});