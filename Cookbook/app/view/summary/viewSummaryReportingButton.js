Ext.define('CookBook.view.summary.ViewSummaryReportingButton', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryReportingButton',

	//options
	allowBlank: true,
	fieldLabel: 'Button',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryReportingButton1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryReportingButton2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});