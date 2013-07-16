Ext.define('CookBook.view.summary.ViewSummaryUUI', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryUUI',

	//options
	allowBlank: true,
	fieldLabel: 'UUI',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryUUI1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryUUI2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});