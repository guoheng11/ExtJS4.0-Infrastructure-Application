Ext.define('CookBook.view.summary.ViewSummaryTTSFunctionality', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTTSFunctionality',

	//options
	allowBlank: true,
	fieldLabel: 'TTS Functionality',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTTSFunctionality1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTTSFunctionality2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});