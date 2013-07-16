Ext.define('CookBook.view.summary.ViewSummaryGrammarsStandard', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryGrammarsStandard',

	//options
	allowBlank: true,
	fieldLabel: 'Standard',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryGrammarsStandard1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryGrammarsStandard2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});