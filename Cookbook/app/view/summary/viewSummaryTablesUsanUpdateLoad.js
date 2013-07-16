Ext.define('CookBook.view.summary.ViewSummaryTablesUsanUpdateLoad', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTablesUsanUpdateLoad',

	//options
	allowBlank: true,
	fieldLabel: 'USAN Update / USAN Load',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTablesUsanUpdateLoad1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTablesUsanUpdateLoad2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});