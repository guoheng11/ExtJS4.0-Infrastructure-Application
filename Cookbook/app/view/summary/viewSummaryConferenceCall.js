Ext.define('CookBook.view.summary.ViewSummaryConferenceCall', {
	extend: 'Ext.form.RadioGroup',
	alias:  'widget.viewSummaryConferenceCall',

	//options
	allowBlank: true,
	fieldLabel: 'Conference Call',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: 'Yes',
			name: 'summaryConferenceCall',
			inputValue: '1'
		},
		{
			boxLabel: 'No', 
			name: 'summaryConferenceCall',
			inputValue: '0'
		}
	]
});