Ext.define('CookBook.view.summary.ViewSummaryLinked', {
	extend: 'Ext.form.RadioGroup',
	alias:  'widget.viewSummaryLinked',

	//options
	allowBlank: false,
	fieldLabel: 'Linked',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: 'Yes',
			name: 'summaryLinked',
			inputValue: '1'
		},
		{
			boxLabel: 'No', 
			name: 'summaryLinked',
			inputValue: '0'
		}
	]
});