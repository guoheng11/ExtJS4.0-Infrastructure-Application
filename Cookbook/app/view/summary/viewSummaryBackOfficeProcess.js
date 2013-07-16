Ext.define('CookBook.view.summary.ViewSummaryBackOfficeProcess', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryBackOfficeProcess',

	//options
	allowBlank: false,
	fieldLabel: 'Process',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryBackOfficeProcess1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryBackOfficeProcess2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});