Ext.define('CookBook.view.summary.ViewSummaryBackOfficeWebServices', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryBackOfficeWebServices',

	//options
	allowBlank: false,
	fieldLabel: 'Web Services',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryBackOfficeWebServices1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryBackOfficeWebServices2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});