Ext.define('CookBook.view.summary.ViewSummaryTablesCustomerUpdateUsanLoad', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTablesCustomerUpdateUsanLoad',

	//options
	allowBlank: true,
	fieldLabel: 'Customer Update / USAN Load',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTablesCustomerUpdateUsanLoad1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTablesCustomerUpdateUsanLoad2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});