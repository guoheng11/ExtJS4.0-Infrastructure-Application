Ext.define('CookBook.view.summary.ViewSummaryReadi800', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryReadi800',

	//options
	allowBlank: true,
	fieldLabel: 'Readi800',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryReadi8001',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryReadi8002',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});