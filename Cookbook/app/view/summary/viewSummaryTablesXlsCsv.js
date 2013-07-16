Ext.define('CookBook.view.summary.ViewSummaryTablesXlsCsv', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTablesXlsCsv',

	//options
	allowBlank: true,
	fieldLabel: '.xls / .csv',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTablesXlsCsv1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTablesXlsCsv2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});