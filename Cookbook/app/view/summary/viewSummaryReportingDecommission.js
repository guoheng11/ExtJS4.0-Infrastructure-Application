Ext.define('CookBook.view.summary.ViewSummaryReportingDecommission', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryReportingDecommission',

	//options
	allowBlank: true,
	fieldLabel: 'Decommission',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryReportingDecommission1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryReportingDecommission2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});