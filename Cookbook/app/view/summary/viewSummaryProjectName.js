Ext.define('CookBook.view.summary.ViewSummaryProjectName', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryProjectName',

	//options
	allowBlank: false,
	fieldLabel: 'Project Name',
	labelAlign: 'top',

	name: 'summaryProjectName',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter the project\'s name'
			});
		}
	}
});