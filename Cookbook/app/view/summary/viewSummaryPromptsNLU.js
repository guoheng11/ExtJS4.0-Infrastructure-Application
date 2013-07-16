Ext.define('CookBook.view.summary.ViewSummaryPromptsNLU', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryPromptsNLU',

	//options
	allowBlank: true,
	fieldLabel: 'NLU',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryPromptsNLU1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryPromptsNLU2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});