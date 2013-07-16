Ext.define('CookBook.view.summary.ViewSummaryProjectDependencies', {
	extend: 'Ext.form.field.TextArea',
	alias:  'widget.viewSummaryProjectDependencies',

	//options
	allowBlank: true,
	fieldLabel: 'Project Dependencies',
	labelAlign: 'top',

	name: 'summaryProjectDependencies'/*,
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter one or more projects that are linked to this project'
			});
		}
	}*/
});