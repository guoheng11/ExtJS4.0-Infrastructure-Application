Ext.define('CookBook.view.summary.ViewSummaryTablesCustomerUpdateLoad', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTablesCustomerUpdateLoad',

	//options
	allowBlank: true,
	fieldLabel: 'Customer Update / Customer Load',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTablesCustomerUpdateLoad1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTablesCustomerUpdateLoad2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});