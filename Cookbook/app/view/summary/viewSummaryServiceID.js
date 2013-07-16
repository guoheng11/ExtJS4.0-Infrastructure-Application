Ext.define('CookBook.view.summary.ViewSummaryServiceID', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryServiceID',

	//options
	allowBlank: true,
	fieldLabel: 'Service ID',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryServiceID1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryServiceID2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});