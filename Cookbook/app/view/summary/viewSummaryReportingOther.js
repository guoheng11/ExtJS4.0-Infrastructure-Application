Ext.define('CookBook.view.summary.ViewSummaryReportingOther', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryReportingOther',

	//options
	allowBlank: true,
	fieldLabel: 'Other',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryReportingOther1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryReportingOther2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});