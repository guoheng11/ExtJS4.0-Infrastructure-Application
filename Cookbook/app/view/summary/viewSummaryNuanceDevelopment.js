Ext.define('CookBook.view.summary.ViewSummaryNuanceDevelopment', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryNuanceDevelopment',

	//options
	allowBlank: true,
	fieldLabel: 'Development',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryNuanceDevelopment1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryNuanceDevelopment2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});