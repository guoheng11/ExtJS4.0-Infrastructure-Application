Ext.define('CookBook.view.summary.ViewSummaryExpedite', {
	extend: 'Ext.form.RadioGroup',
	alias:  'widget.viewSummaryExpedite',

	//options
	allowBlank: false,
	fieldLabel: 'Expedite',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',

	name: 'summaryExpediteRadio',
	
	items: [
		{ 
			boxLabel: 'Yes',
			name: 'summaryExpediteRadio',
			inputValue: '1'
		},
		{
			boxLabel: 'No', 
			name: 'summaryExpediteRadio',
			checked: true,
			inputValue: '0'
		}
	]
});