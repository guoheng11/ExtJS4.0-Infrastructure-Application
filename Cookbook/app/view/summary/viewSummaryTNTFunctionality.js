Ext.define('CookBook.view.summary.ViewSummaryTNTFunctionality', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTNTFunctionality',

	//options
	allowBlank: true,
	fieldLabel: 'TNT Functionality',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTNTFunctionality1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTNTFunctionality2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});