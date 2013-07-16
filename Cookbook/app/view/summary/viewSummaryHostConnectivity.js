Ext.define('CookBook.view.summary.ViewSummaryHostConnectivity', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryHostConnectivity',

	//options
	allowBlank: true,
	fieldLabel: 'Connectivity',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryHostConnectivity1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryHostConnectivity2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});