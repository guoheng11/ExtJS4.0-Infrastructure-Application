Ext.define('CookBook.view.summary.ViewSummaryPromptsStandard', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryPromptsStandard',

	//options
	allowBlank: true,
	fieldLabel: 'Standard',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryPromptsStandard1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryPromptsStandard2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});