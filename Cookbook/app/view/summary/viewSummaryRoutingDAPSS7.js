Ext.define('CookBook.view.summary.ViewSummaryRoutingDAPSS7', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryRoutingDAPSS7',

	//options
	allowBlank: true,
	fieldLabel: 'DAPSS7',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryRoutingDAPSS71',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryRoutingDAPSS72',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});