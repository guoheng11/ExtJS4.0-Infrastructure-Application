Ext.define('CookBook.view.summary.ViewSummaryBackOfficeDB', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryBackOfficeDB',

	//options
	allowBlank: false,
	fieldLabel: 'DB',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryBackOfficeDB1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryBackOfficeDB2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});