Ext.define('CookBook.view.summary.ViewSummaryTablesDefFile', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTablesDefFile',

	//options
	allowBlank: true,
	fieldLabel: 'Def File',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTablesDefFile1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTablesDefFile2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});