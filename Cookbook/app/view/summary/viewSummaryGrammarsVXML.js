Ext.define('CookBook.view.summary.ViewSummaryGrammarsVXML', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryGrammarsVXML',

	//options
	allowBlank: true,
	fieldLabel: 'VXML',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryGrammarsVXML1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryGrammarsVXML2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});