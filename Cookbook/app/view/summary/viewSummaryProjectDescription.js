Ext.define('CookBook.view.summary.ViewSummaryProjectDescription', {
	extend: 'Ext.form.field.TextArea',
	alias:  'widget.viewSummaryProjectDescription',

	//options
	allowBlank: true,
	fieldLabel: '',

	name: 'usanProjectDescription',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter a description for the project'
			});
		}
	}
});