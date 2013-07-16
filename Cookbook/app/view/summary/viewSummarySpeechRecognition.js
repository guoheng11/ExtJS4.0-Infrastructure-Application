Ext.define('CookBook.view.summary.ViewSummarySpeechRecognition', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummarySpeechRecognition',

	//options
	allowBlank: true,
	fieldLabel: 'Speech Recognition',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summarySpeechRecognition1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summarySpeechRecognition2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});