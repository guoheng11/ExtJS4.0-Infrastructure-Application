Ext.define('CookBook.view.summary.ViewSummaryReportingVision', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryReportingVision',

	//options
	allowBlank: true,
	fieldLabel: 'Vision',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryReportingVision1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryReportingVision2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});