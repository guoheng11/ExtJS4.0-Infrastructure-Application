Ext.define('CookBook.view.summary.ViewSummaryEngine', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryEngine',

	//options
	allowBlank: true,
	fieldLabel: 'Engine',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryEngine1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryEngine2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});