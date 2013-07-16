Ext.define('CookBook.view.summary.ViewSummaryProjectFolder', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryProjectFolder',

	//options
	allowBlank: false,
	fieldLabel: 'Project Folder',
	labelAlign: 'left',
	value: '',
	//html:  '<a href=file://///ops1/e_drive target=_blank> Click me! </a>',

	name: 'summaryProjectFolder',
	itemId:'summaryProjectFolder',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter the project folder. Use the Links Menu>Project Specific Links>Project Folder to Navigate to here.'
			});
		}
	}
});